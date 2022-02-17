# Python 2 Versus Python 3
All of the code samples in this book have been written for Python 3.6. Except for very minor
changes, they should work in Python 2.7 as well. The author believes that Python 3 has
crossed the tipping point for being the preferred choice for new Django projects.


Python 2.7 development was supposed to end in 2015 but was extended for 5 more years,
through to 2020. There will not be a Python 2.8. As mentioned in **Chapter 2**, Application
Design, most major Linux distributions and cloud vendors have completely switched to
using Python 3 as a default or support it.


This appendix has been written for developers who are not familiar with Python 3. A brief
historical background and syntax changes in Python 3 are discussed. Rather than offering
exhaustive coverage of Python 3 features, only the relevant ones for Django developers are
covered.

### Python 3

Python 3 was born out of necessity. One of Python 2's major annoyances was its
inconsistent handling of non-English characters (commonly manifested as the infamous
UnicodeDecodeError). Guido initiated the Python 3 project to clean up a number of such
language issues while breaking backward compatibility.


The first alpha release of Python 3.0 was made in August 2007. Since then, Python 2 and
Python 3 have been in parallel development by the core development team for a number of
years. Eventually, Python 3 is expected to be the future of the language.


### Python 3 for Djangonauts
This section covers the most important changes in Python 3 from a Django developer's
perspective. To understand the full list of changes, refer to the recommended reading
section at the end.

The examples are given in both Python 2 and Python 3. Depending on your installation, all
Python 3 commands might need to be changed from Python to Python 3.


**Change all `__unicode__` methods into `__str__`**

In Python 3, the `__str__()` method is called for string representation of your models
rather than the awkward sounding `__unicode__()` method. This is one of the most
evident ways of identifying Python 3 ported code:


**python 2**

```python
class Person(models.Model):
    name = models.TextField()

    def __unicode__(self):
        return self.name
```


**python 3**

```python
class Person(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name
```

This reflects the difference in the way Python 3 treats strings. In Python 2, the human
readable representation of a class can be returned by `__str__()` (bytes) or
`__unicode__()` (text). However, in Python 3, the readable representation is simply
returned by `__str__()` (text).


### All classes inherit from object

Python 2 has two kinds of classes: old-style (classic) and new-style. New-style classes are
classes that directly or indirectly inherit from object. Only new-style classes can use
Python's advanced features, such as slots, descriptors, and properties. Many of these are
used by Django. However, classes are still old-style by default for compatibility reasons.


In Python 3, old-style classes don't exist anymore. As seen in the following table, even if
you don't explicitly mention any parent classes, the object class will be present as a base. So,
all classes are new-style:

**python 2**

```python
>>> class CoolMixin:
... pass
>>> CoolMixin.__bases__
()
```

**python 3**

```python
>>> class CoolMixin:
... pass
>>> CoolMixin.bases
(<class 'object'>,)
```

**Calling super() is easier**

The simpler call to super(), without any arguments, will save you some typing in Python 3:


**python 2**

```python
class CoolMixin(object):
    def do_it(self):
        return super(CoolMixin, self).do_it()
```


**python 3**

```python
class CoolMixin:
    def do_it(self):
        return super().do_it()
```


Specifying the class name and instance is optional, thereby making your code **DRY** and less
prone to errors while refactoring.


### Relative imports must be explicit

Imagine the following directory structure for a package named app1:


```
/app1
 /__init__.py
 /models.py
 /tests.py
```

Now, in Python 3, let's run the following in the parent directory of app1:


```
$ echo "import models" > app1/tests.py

$ python -m app1.tests
Traceback (most recent call last):
 ... omitted ...
ImportError: No module named 'models'

$ echo "from . import models" > app1/tests.py

$ python -m app1.tests
# Successfully imported
```

Within a package, you should use explicit relative imports when referring to a sibling
module. You can omit `__init__.py` in Python 3, though it is commonly used to identify
a package.

In Python 2, you can use import models to successfully import the `models.py` module.
However, it is ambiguous and could accidentally import any other `models.py` in your
Python path; hence, this is forbidden in Python 3 and discouraged in Python 2 as well.


### HttpRequest and HttpResponse have str and bytes types

In Python 3, according to PEP 3333 (amendments to the WSGI standard), we are careful not
to mix data coming from or leaving via HTTP, which will be in bytes, as opposed to text
within the framework, which will be native (Unicode) strings.


Essentially, for HttpRequest and HttpResponse objects, keep the following in mind:

- Headers will always be `str` objects
- Input and output streams will always be byte objects


Unlike Python 2, strings and bytes are not implicitly converted while performing
comparisons or concatenations with each other. Strings means Unicode strings only.


### f-strings or formatted string literals

In Python 3, you might see string literals prefixed by an f. These strings may contain
expressions inside curly brackets, similar to the format strings accepted by `str.format()`.
They will be evaluated at runtime using the `format()` protocol.


Here are some examples:

```
>>> class Person:
...    def __init__(self, name):
...       self.name = name
...    def __str__(self):
...       return f"name is {self.name}"
...

>>> p = Person("Hexa")

>>> str(p)
'name is Hexa'
```

Though this syntax might seem alien at first, you will find it to be more convenient to use
than the alternatives for string formatting.


### Exception syntax changes and improvements

Exception handling syntax and functionality has been significantly improved in Python 3.


In Python 3, you cannot use the comma-separated syntax for the `except` clause. Use the `as` keyword instead:

**python 2**

```python
try:
  pass
except e, BaseException:
  pass
```

**python 2 and 3**

```python
try:
    pass
except e as BaseException:
    pass
```


The new syntax is recommended for Python 2 as well.

In Python 3, all exceptions must be derived (directly or indirectly) from `BaseException`. In
practice, you will create your custom exceptions by deriving from the `Exception` class.

As a major improvement in error reporting, if an exception occurs while handling an
exception, the entire chain of exceptions is reported:


**python 2**

```python
>>> try:
...   print(undefined)
... except Exception:
...   print(oops)
...

Traceback (most recent call
last):
 File "<stdin>", line 4, in
<module>
NameError: name 'oops' is not defined
```

**python 3**

```python
>>> try:
...   print(undefined)
... except Exception:
...   print(oops)
...

Traceback (most recent call last):
File "<stdin>", line 2, in <module>
NameError: name 'undefined' is not defined
During handling of the above exception,
another exception occurred:
Traceback (most recent call last):
File "<stdin>", line 4, in <module>
NameError: name 'oops' is not defined
```

Once you get used to this feature, you will definitely miss it in Python 2.


### Standard library reorganized

The core developers have cleaned up and better organized the Python standard library. For
instance, `SimpleHTTPServer` now lives in the `http.server` module:

**python 2**

```python
$ python -m SimpleHTTPServer
Serving HTTP on 0.0.0.0 port 8000 ...
```

**python 3**

```python
$python -m http.server
Serving HTTP on 0.0.0.0 port 8000 ...
```

### New goodies

Python 3 is not just about language fixes. It is also where bleeding-edge Python
development happens. This means improvements to the language in terms of syntax,
performance, and built-in functionality.


Some of the notable new modules added to Python 3 are as listed:
- asyncio: Asynchronous I/O, event loop, coroutines, and tasks
- secrets: Cryptographically strong random numbers
- unittest.mock: Mock object library for testing
- pathlib: Object-oriented filesystem paths
- statistics: Mathematical statistics functions


Even though some of these modules might have backports to Python 2, it is more appealing
to migrate to Python 3 and leverage them as built-in modules.


#### Pyvenv and pip are built in

Most serious Python developers prefer using virtual environments. `virtualenv` is quite
popular for isolating project setups from the system-wide Python installation. Thankfully,
Python 3.3 is integrated with a similar functionality using the `venv` module.

From Python 3.4, a fresh virtual environment will be pre-installed with `pip`, a popular
installer:


```shell
$ python -m venv djenv
[djenv] $ source djenv/bin/activate
[djenv] $ pip install django
```

### Other changes

We cannot possibly fit all the Python 3 changes and improvements into this appendix.
However, the other commonly cited changes are as follows:

1. `print()` is now a function: Previously it was a statement, that is, arguments were not in parentheses
2. Integers don't overflow: `sys.maxint` is outdated; integers will have unlimited precision
3. Inequality `operator <>` is removed: Use != instead
4. True Integer Division: In Python 2, 3/2 would evaluate to 1. It will be correctly evaluated to 1.5 in Python 3
5. Use range instead of xrange: `range()` will now return iterators, as `xrange()` used to work before
6. Dictionary keys are views: dict and dict-like classes (such as `QueryDict`) will return iterators instead of lists for `keys()`, `items()`, and `values()` method calls



### Further information

- Read What's New In Python 3.0 by Guido
https://docs.python.org/3/whatsnew/3.0.html
- To find out what's new in each release of Python, read What's New in
Python at https://docs.python.org/3/whatsnew/
- For richly-detailed answers about Python 3, read Python 3 Q & A by Nick Coghlan
at http://python-notes.curiousefficiency.org/en/latest/python3/questions_and_answers.html
