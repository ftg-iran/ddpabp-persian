# Testing and Debugging

In this chapter, we will discuss the following topics:

- TDD
- Dos and don'ts of writing tests
- Mocking
- Debugging
- Logging

Every programmer must have, at least, considered skipping writing tests. In Django, the
default app layout has a `tests.py` module with some placeholder content. It is a reminder
that tests are needed. However, we are often tempted to skip it.

In Django, writing tests is quite similar to writing code. In fact, it is practically code. So, the
process of writing tests might seem like doubling (or even more) the effort of coding.
Sometimes, we are under so much time pressure that it might seem ridiculous to spend
time writing tests when we are just trying to make things work.

However, eventually, it is pointless to skip tests if you ever want anyone else to use your
code. Imagine that you invented an electric razor and tried to sell it to your friend saying
that it worked well for you, but you haven't tested it properly. Being a good friend of yours,
they might agree, but imagine their horror if you told this to a stranger.

## Why write tests?

Tests in a software check whether it works as expected. Without tests, you might be able to
say that your code works, but you will have no way to prove that it works correctly.

Additionally, it is important to remember that it can be dangerous to omit unit testing in
Python because of its duck-typing nature. Unlike languages such as Haskell, type checking
cannot be strictly enforced at compile time (though type-hinting helps). Unit tests, being
run at runtime (although in a separate execution), are essential in Python development.

Writing tests can be a humbling experience. The tests will point out your mistakes, and you
will get a chance to make an early course correction. In fact, there are some who advocate
writing tests before the code itself.

## TDD

TDD is a form of software development where you first write the test, run the test (which
would fail first), and then write the minimum code needed to make the test pass. This
might sound counterintuitive. Why do we need to write tests when we know that we have
not written any code and we are certain that it will fail because of that?

However, look again. We do eventually write the code that merely satisfies these tests. This
means that these tests are not ordinary tests, they are more like specifications. They tell you
what to expect. These tests or specifications will directly come from your client's user
stories. You are writing just enough code to make it work.

The process of TDD has many similarities to the scientific method, which is the basis of
modern science. In the scientific method, it is important to frame the hypothesis first, gather
data, and then conduct experiments that are repeatable and verifiable to prove or disprove
your hypothesis.

My recommendation will be to try TDD once you are comfortable writing tests for your
projects. Beginners might find it difficult to frame a test case that checks how the code
should behave. For the same reasons, I won't suggest TDD for exploratory programming.

## Writing a test case

There are different kinds of tests. However, as a minimum, a programmer needs to know
unit tests since they have to be able to write them. Unit testing checks the smallest testable
part of an application. Integration testing checks whether these parts work well with each
other.

The word unit is the key term here. Just test one unit at a time. Let's take a look at a simple
example of a test case:

```python
# tests.py
from django.test import TestCase
from django.core.urlresolvers import resolve
from .views import HomeView
class HomePageOpenTestCase(TestCase):
def test_home_page_resolves(self):
view = resolve('/')
self.assertEqual(view.func.__name__,
HomeView.as_view().__name__)
```

This is a simple test that checks whether the user is correctly taken to the home page
view when they visit the root of our website's domain. Like most good tests, it has a long
and self-descriptive name. The test simply uses Django's `resolve()` function to match the
view callable mapped to the / root location to the known view function by their names.

It is more important to note what is not done in this test. We have not tried to retrieve the
HTML content of the page or check its status code. We have restricted ourselves to test just
one unit, that is, the `resolve()` function, which maps the URL paths to view functions.

Assuming that this test resides in, say, `app1` of your project, the test can be run with the
following command:

```python
$ ./manage.py test app1
Creating test database for alias 'default'...
.
-----------------------------------------------------------------
Ran 1 test in 0.088s
OK
Destroying test database for alias 'default'...
```

This command runs all the tests in the `app1` application or package. The default test runner
will look for tests in all modules in this package matching the `test*.py` pattern.

Django now uses the standard `unittest` module provided by Python rather than bundling
its own. You can write a `testcase` class by subclassing from `django.test.TestCase`.

This class typically has methods with the following naming convention:

- `test*`: Any method whose name starts with `test` will be executed as a test
method. It takes no parameters and returns no values. Tests will be run in
alphabetical order.
- `setUp` (optional): This method will be run before each test method. It can be used
to create shared objects or perform other initialization tasks that bring your test
case to a known state.
- `tearDown` (optional): This method will be run after a test method, irrespective of
whether the test passed or not. Clean-up tasks are usually performed here.

A test case is a way to logically group test methods, all of which test a scenario. When all
the test methods pass (that is, do not raise any exception), the test case is considered passed.
If any of them fail, the test case fails.

## The assert method

Each test method usually invokes an `assert*()` method to check some expected outcome
of the test. In our first example, we used `assertEqual()` to check whether the function
name matches the expected function.

Similar to `assertEqual()`, the Python 3 `unittest` library provides more than 32 assert
methods. It is further extended by Django by more than 19 framework-specific assert
methods. You must choose the most appropriate method based on the end outcome that
you are expecting so that you will get the most helpful error message.

Let's take a look at why by looking at an example `testcase` that has the
following `setUp()` method:

```python
def setUp(self):
    self.l1 = [1, 2]
    self.l2 = [1, 0]
```

Our test is to assert that `l1` and `l2` are equal (and it should fail, given their values). Let's
take a look at several equivalent ways to accomplish this:

Test Assertion Statement | What Test Output Looks Like (unimportant lines omitted) |
--- | ---
```assert self.l1 == self.l2``` |  ```assert self.l1 == self.l2 AssertionError```
```self.assertEqual(self.l1, self.l2)``` | ```AssertionError: Lists differ: [1, 2] != [1, 0] First differing element 1: 2, 0```
```self.assertListEqual(self.l1,self.l2)``` | ```AssertionError: Lists differ: [1, 2] != [1, 0] First differing element 1: 2, 0```
```self.assertListEqual(self.l1, None)``` | ```AssertionError: Second sequence is not a list: None```

The first statement uses Python's built-in `assert` keyword. Note that it throws the least
helpful error. You cannot infer what values or types are in the `self.l1` and `self.l2`
variables. This is primarily the reason why we need to use the `assert*()` methods.

Next, the exception thrown by `assertEqual()` very helpfully tells you that you are
comparing two lists and even tells you at which position they begin to differ. This is exactly
similar to the exception thrown by the more specialized `assertListEqual()` function.
This is because, as the documentation would tell you, if `assertEqual()` is given two lists
for comparison, it hands it over to `assertListEqual()`.

Despite this, as the last example proves, it is always better to use the most specific `assert*`
method for your tests. Since the second argument is not a list, the error clearly tells you that
a list was expected.

`Use the most specific assert* method in your tests.`

Therefore, you need to familiarize yourself with all the `assert` methods and choose the
most specific one to evaluate the result you expect. This also applies when you are checking
whether your application does not do things it is not supposed to do, that is, a negative test
case. You can check for exceptions or warnings using `assertRaises` and `assertWarns`,
respectively.

## Writing better test cases

We have already seen that the best test cases test a small unit of code at a time. They also
need to be fast. A programmer needs to run tests at least once before every commit to the
source control. Even a delay of a few seconds can tempt a programmer to skip running tests
(which is not a good thing).

Here are some qualities of a good test case (which is a subjective term, of course) in the
form of an easy-to-remember mnemonic **fast, independent, repeatable, small,
transparent (FIRST)** class test case:

