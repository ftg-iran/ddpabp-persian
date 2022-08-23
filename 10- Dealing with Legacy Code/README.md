# سرو کار داشتن با کد مورثی

در این فصل، ما در مورد موضوعات زیر صحبت خواهیم کرد:

- یک کد اولیه جنگو را می خوانیم
-	بررسی اسناد مرتبط
- تغییرات افزایشی در مقابل بازنویسی کامل
- تست نوشتن قبل از ایجاد هر گونه تغییر
- اتصال دیتابیس  موروثی

وقتی از شما در خواست می شود تا به یک پروژه ملحق بشوید، هیجان انگیز به نظر میرسد. چرا که ابزارهای قدرتمند جدید و فناوری‌های پیشرفته احتمالا در انتظار شما است. اما با این حال، اغلب از شما درخواست می شود که با یک مجموعه ای از کدهای موجود که احتمالا قدیمی است کار کنید.

در تعبیری  منصفانه ، از پیدایش جنگو مدت زمان زیادی نمی گذرد. به هر حال، پروژه‌های نوشته شده برای نسخه‌های قدیمی جنگو به اندازه کافی متفاوت هستند که باعث نگرانی می‌شود. گاهی اوقات، داشتن همه کدهای منبع و اسناد مرتبط با آن شاید کافی نباشد.

اگر از شما خواسته شد که محیط را دوباره ایجاد کنید ممکن است که لازم باشد تا شما با پیکربندی سیستم عامل، تنظیمات پایگاه داده و اجرای سرویس‌ها به صورت محلی و یا در بستر شبکه کار کنید. بخش های مختلفی برای انجام این پازل وجود دارد که ممکن است تعجب کنید که چطور و از کجا باید شروع کنید.

پی بردن به اینکه در پروژه از چه نسخه ای از جنگو استفاده شده است یک نکته کلیدی است. با تکامل جنگو، همه چیز از ساختار پروژه پیش‌فرض گرفته تا بهترین روش‌های توصیه شده تغییر کرده است. بنابراین تشخیص اینکه از کدام نسخه جنگو استفاده شده است، یک بخش حیاتی در درک آن است.

***تغییر نگهبانان***

تیم superBook صبورانه روی کیسه‌های لوبیای کوتاه مسخره در اتاق تمرین نشسته و منتظر هارت بودند. او یک جلسه اضطراری حضوری تشکیل داده بود. هیچ کس بخش اضطراری را درک نکرد، زیرا حداقل سه ماه از شروع به کار آنها گذشته بود.

خانم O با عجله در حالی که یک لیوان قهوه با طراحی بزرگ در یک دست داشت و در دست دیگر مشتی پرینت از چیزی که شبیه جدول زمانی پروژه بود وارد شد. او بدون اینکه به بالا نگاه کند، گفت: "خیلی زمان نداریم، بنابراین مستقیماً به سر اصل مطلب می‌روم. با توجه به حملات هفته گذشته، هیئت مدیره تصمیم گرفته است که پروژه SuperBook سریعا به جمع بندی برسد و مهلت را تا پایان ماه آینده تعیین کرده است. سوالی هست؟"

برد گفت: بسیار خب، هارت کجاست؟ خانم O مکث کرد، و پاسخ داد: "خوب استعفا داد. او به عنوان رئیس امنیت فناوری اطلاعات مسئولیت اخلاقی رخنه محیطی <sup>[1](#footnote-1)</sup> را بر عهده گرفت." استیو که ظاهراً شوکه شده بود، سرش را تکان می داد. او ادامه داد: متاسفم، اما من به عنوان سرپرست SuperBook گمارده شده‌ام و باید اطمینان حاصل کنم که هیچ مانعی برای انجام پروژه تا موعد مقرر نداریم.

یک ناله جمعی شنیده شد. خانم O که دلسرد نشد، یکی از برگه ها را گرفت و گفت، "اینجا می گوید که ماژول بایگانی از راه دور در وضعیت ناقص بالاترین اولویت را دارد. من معتقدم که ایوان روی این موضوع کار می کند."
ایوان از انتهای اتاق گفت: "درست است." او به دیگران لبخند زد: "تقریباً آنجاست." خانم O از بالای لبه عینکش نگاه کرد و خیلی مؤدبانه لبخند زد.

ایوان از انتهای اتاق گفت: "درست است." او به دیگران لبخند زد: "تقریباً آنجاست." خانم O از بالای لبه عینکش نگاه کرد و خیلی مؤدبانه لبخند زد.

"با توجه به اینکه ما در حال حاضر یک بایگانی بسیار آزمایش شده و کارآمد در پایگاه کد سنتینل خود داریم، توصیه می کنم به جای ایجاد یک سیستم اضافی دیگر، از آن استفاده کنید."

استیو حرفش را قطع کرد، "این کار خیلی اضافه‌ای است. ما می توانیم نسبت به بایگانی کننده قدیمی پیشرفت کنیم، نه؟ اگر خراب نیست، پس نیازی به اصلاح ندارد". خانم O خیلی خلاصه پاسخ داد. برد با صدای بلندگفت  "او دارد روی آن کار می کند" "در مورد همه کارهایی که قبلاً به پایان رسانده است؟"

خانم O با بی حوصلگی پرسید. "ایوان، چه مقدار از کار را تا کنون تکمیل کرده ای؟" او با حالت دفاعی پاسخ داد: «حدود 12 درصد». همه با ناباوری به او نگاه کردند.  او گفت : "چی؟ این 12 درصد سخت‌ترین بخش کار بود."

خانم O ادامه جلسه را با همین حالت ادامه داد. کار همه دوباره اولویت‌بندی شد و متناسب با مهلت زمانی جدید، فشرده شد. همانطور که کاغذهایش را برداشت، آماده رفتن بود، مکثی کرد و عینکش را برداشت و گفت:


"من به معنای واقعی کلمه می دانم که همه شما به چه چیزی فکر می کنید ، اما باید بدانید که ما هیچ انتخابی در مورد  تعیین ضرب الاجل نداشتیم. تنها چیزی که اکنون می توانم به شما بگویم این است که جهان برای رسیدن به آن تاریخ، به هر نحوی، روی شما حساب می کند" عینکش را دوباره گذاشت و از اتاق خارج شد.

ایوان با صدای بلند با خود گفت: "حتما کلاه فویل خود را خواهم آورد<sup>[2](#footnote-2)</sup>
. "

## Finding the Django Version

Ideally, every project will have a `requirements.txt` or `setup.py` file at the root directory, and it will have the exact Version of Django used for that project. Let's look for a
line similar to this:
 
 `Django==1.5.9`

The version number is mentioned precisely (rather than `Django>=1.5.9`),
which is called **pinning**. Pinning every package is considered a good
practice since it reduces surprises and makes your build more
deterministic.

As a best practice, it is advisable to create a completely repeatable environment for a
project. This includes having a requirements file with all transitive dependencies listed,
pinning, and with `--hash` digests. `--hash` digests of the packages look like this:

`Django==1.5.9 --hash=sha256:2cf24dba5fb0a30e26e83b2ac5...`

Hashes protect against remote tampering and save the need to create private package index
servers containing approved packages.
Unfortunately, there are real-world code bases where the `requirements.txt` file was not
updated or even completely missing. In such cases, you will need to probe for various
telltale signs to find out the exact version.

## Activating the virtual environment

In most cases, a Django project will be deployed within a virtual environment. Once you
locate the virtual environment for the project, you can activate it by jumping to that
directory and running the activated script for your OS.

For Linux, the command is as follows:

```bash
$ source venv_path/bin/activate
```

Once the virtual environment is active, start a Python shell and query the Django Version,
as shown:

```bash
$ python
>>> import django
>>> print(django.get_version())
1.5.9
```

The Django Version used in this case is Version `1.5.9`.
Alternatively, you can run the `manage.py` script in the project to get a similar output:

```bash
$ python manage.py --version
1.5.9
```

However, this option will not be available if the legacy project source snapshot was sent to
you in an undeployed form. If the virtual environment (and packages) was also included,
you can easily locate the version number (in the form of a tuple) in the `__init__.py` file of the Django directory. Consider the given example:

```bash
$ cd envs/foo_env/lib/python2.7/site-packages/django
$ cat __init__.py
VERSION = (1, 5, 9, 'final', 0)
...
```

If all these methods fail, you will need to go through the release notes of the past Django
Versions to determine the identifiable changes (for example, the `AUTH_PROFILE_MODULE`
setting was deprecated since version 1.5) and match them to your legacy code. Once you
pinpoint the correct Django Version, then you can move on to analyzing the code.

[Pipenv](https://docs.pipenv.org/), a recent but [officially recommended](https://packaging.python.org/tutorials/managing-dependencies/#installing-pipenv) Python packaging tool, aims to solve many of these problems. It combines the functionality of `pip` and `virtualenv` so that when you install a package, it updates its requirements file (called pipenv) automatically. Last but not least, it enables repeatable builds using a `Pipenv.lock` file, which is fully pinned and
includes hashes.

## Where are the files? This is not PHP

One of the most difficult ideas to get used to, especially if you are from the PHP or
ASP.NET world, is that the source files are not located in your web server's document root
directory, which is usually named `wwwroot` or `public_html`. Additionally, there is no
direct relationship between the code's directory structure and the website's URL structure.

In fact, you will find that your Django website's source code is stored in an obscure path
such as `/opt/webapps/my-django-app`. Why is this? Among many good reasons, it is
often more secure to move your confidential data outside your public web root. This way, a
web crawler will not be able to accidentally stumble into your source code directory.

As you will read in `Chapter 13`, _Production-Ready_, the location of the source code can be
found by examining your web server's configuration file. Here, you will find either the
`DJANGO_SETTINGS_MODULE` environment variable being set to the module's path, or it will
pass on the request to a WSGI server that will be configured to point to
your `project.wsgi` file.

## Starting with urls.py

Even if you have access to the entire source code of a Django site, figuring out how it works
across various apps can be daunting. Often, it is best to start from the root `URLconf` located
in the `urls.py`, file since it is literally a map that ties every request to the respective views.

With normal Python programs, I often start reading from the start of its execution–say,
from the top-level main module or wherever the `__main__` check idiom starts. In the case
of Django applications, I usually start with `urls.py` since it is easier to follow the flow of
execution based on the various URL patterns a site has.

In Linux, you can use the following `find` command to locate the `settings.py` file and the
corresponding line specifying the `urls.py` root:

```bash
$ find . -iname settings.py -exec grep -H 'ROOT_URLCONF' {} \;
./projectname/settings.py:ROOT_URLCONF = 'projectname.urls'
$ ls projectname/urls.py
projectname/urls.py
```

## Jumping around the code

Reading code sometimes feels like browsing the web without the hyperlinks. When you
encounter a function or variable defined elsewhere, you will need to jump to the file that
contains that definition. Some IDEs can do this automatically for you as long as you tell it
which files to track as part of the project.

If you use Emacs or Vim instead, you can create a TAGS file to quickly navigate between
files. Go to the project root and run a tool called **Exuberant Ctags**, as follows:

```bash
find . -iname "*.py" -print | etags -
```

This creates a file called TAGS that contains the location information, where every syntactic
unit, such as classes and functions, is defined. In Emacs, you can find the definition of the
tag, where your cursor (or point as it is called in Emacs) is at using the `M-`. command.

While using a tag file is extremely fast for large code bases, it is quite basic and is not aware
of a virtual environment (where most definitions might be located). An excellent alternative
is to use the `elpy` package in Emacs. It can be configured to detect a virtual environment.
Jumping to a definition of a syntactic element is using the same `M-`. command. However,
the search is not restricted to the tag file, so you can even jump to a class definition within
the Django source code seamlessly. Most IDEs provide this feature under the `Navigate/Go
to definition` name.

## Understanding the code base

It is quite rare to find legacy code with good documentation. Even if you do, the
documentation might be out of sync with the code in subtle ways that can lead to further
issues. Often, the best guide to understanding the application's functionality is the
executable test cases and the code itself.

The official Django documentation has been organized according to versions at
[https://docs.djangoproject.com](https://docs.djangoproject.com). On any page, you can quickly switch to the
corresponding page in the previous versions of Django with a selector in the bottom right-
hand section of the page:

![image 01](1.png)

In the same way, documentation for any Django package hosted on [readthedocs.org](http://readthedocs.org) can
also be traced back to its previous versions.

For example, you can select the documentation of `django-braces` all the way back to
v1.0.0 by clicking on the selector in the bottom left-hand section of the page:

![image 02](2.png)

## Creating the big picture

Most people find it easier to understand an application if you show them a high-level
diagram. While this is ideally created by someone who understands the workings of the
application, there are tools that can create very helpful high-level depictions of a Django
application.

A graphical overview of all models in your apps can be generated by the `graph_models`
management command, which is provided by the `django-command-extensions`
package. As shown in the following diagram, the model classes and their relationships can
be understood at a glance:

![image 03](3.png)

This visualization is actually created using PyGraphviz. This can get really large for
projects of even medium complexity. Hence, it might be easier if the applications are
logically grouped and visualized separately.

## PyGraphviz installation and usage

If you find the installation of PyGraphviz challenging, then don't worry, you are not alone.
Recently, I faced numerous issues while installing on Ubuntu, ranging from Python 3
incompatibility to incomplete documentation. To save your time, I have listed the steps that
worked for me to reach a working setup:

1. On Ubuntu, you will need the following packages installed to install
PyGraphviz:

```bash
$ sudo apt-get install python-dev graphviz libgraphviz-dev pkg-config
```

2. Now, activate your virtual environment and run pip to install the development
version of PyGraphviz directly from GitHub, which supports Python 3:

```bash
$ pip install
git+http://github.com/pygraphviz/pygraphviz.git#egg=pygraphviz
```

3. Next, install `django-extensions` and add it to your `INSTALLED_APPS`. Now,
you are all set.

4. Here's a sample used to create a GraphViz dot file for just two apps and to
convert it to a PNG image for viewing:

```bash
$ python manage.py graph_models app1 app2 > models.dot
$ dot -Tpng models.dot -o models.png
```

## Incremental change or a full rewrite?

Often, you will be handed over legacy code by the application owners in the earnest hope
that most of it can be used right away or after a couple of minor tweaks. However, reading
and understanding a huge and often outdated code base is not an easy job. Unsurprisingly,
most programmers prefer working on greenfield development.

In the best case scenario, the legacy code ought to be easily testable, well documented, and
flexible to work in modern environments so that you can start making incremental changes
in no time. In the worst case, you might recommend discarding the existing code and go for
a full rewrite. Alternatively, as it is in most cases, the short-term approach will be to keep
making incremental changes, and a parallel long-term effort might be underway for a
complete reimplementation.

A general rule of thumb to follow while taking such decisions is that if the cost of rewriting
the application and maintaining the application is lower than the cost of maintaining the
old application over time, it is recommended to go for a rewrite. Care must be taken to
account for all the factors, such as the time taken to get new programmers up to speed, and
the cost of maintaining outdated hardware.

Sometimes, the complexity of the application domain becomes a huge barrier against a
rewrite, since a lot of knowledge learned in the process of building the older code gets lost.
Often, this dependency on the legacy code itself is a sign of poor design in the application,
like failing to externalize the business rules from the application logic.

The worst form of a rewrite you can probably undertake is a conversion or a mechanical
translation from one language to another without taking any advantage of the existing best
practices. In other words, you lost the opportunity to modernize the code base by removing
years of cruft.

Code should be seen as a liability and not as an asset. As counter-intuitive as it might
sound, if you can achieve your business goals with a smaller amount of code, you have
dramatically increased your productivity. Having less code to test, debug, and maintain can
not only reduce ongoing costs, but also make your organization more agile and flexible to
change.

`Code is a liability, not an asset. Less code is more maintainable.`

Irrespective of whether you are adding features or trimming your code, you must not touch
your working legacy code without tests in place.

## Writing tests before making any changes

In the *Working Effectively with Legacy Code* book by *Michael Feathers*, legacy code is defined
as, simply, code without tests. He elaborates that with tests, you can easily modify the
behavior of the code quickly and verifiably. In the absence of tests, it is impossible to gauge
whether the change made the code better or worse.

Often, we do not know enough about legacy code to confidently write a test. Michael
recommends writing tests that preserve and document the existing behavior, which are
called characterization tests.

Unlike the usual approach of writing tests, while writing a characterization test, you will
first write a failing test with a dummy output, say X, because you don't know what to
expect. When the test harness fails with an error, such as **Expected output X but got Y**, you
will change your test to expect Y. So, now the test will pass, and it becomes a record of the
code's existing behavior.

`We might record buggy behavior as well. After all, this is unfamiliar code.
Nevertheless, writing such tests are necessary before we start changing
the code. Later, when we know the specifications and code better, we can
fix these bugs and update our tests (not necessarily in that order).`

## Step-by-step process to writing tests

Writing tests before changing the code is similar to erecting a scaffolding before the
restoration of an old building. It provides a structural framework that helps you
confidently undertake repairs.

You might want to approach this process in a stepwise manner as follows:

1. Identify the area you need to make changes to. Your bug reports can be a good
guide for narrowing down the problem area. Write characterization tests
focusing on this area until you have satisfactorily captured its behavior.

2. Look at the changes you need to make and write specific test cases for those.
Resist the temptation to add new functionality. Prefer smaller unit tests to larger
and slower integration tests.

3. Introduce incremental changes and test in lockstep. If tests break, try to analyze
whether it was expected. Don't be afraid to break even the characterization tests
if that behavior is something that was intended to change.

Observe that characterization tests capture all the existing behavior of your code, including
bugs. Once your code goes into production and users become familiar with it, the bugs can
become the expected behavior. So these tests serve as a testable documentation of the as-is
functionality.

If you have a good set of granular tests around your code, you can quickly find the effect of
changing your code. Hence, the value of writing more unit tests with good coverage will
help you quickly identify the impact of a change.

On the other hand, if you decide to rewrite by discarding your code but not your data,
Django can help you considerably.

## Legacy database integration

There is an entire section on legacy databases in Django documentation and rightly so, as
you will run into them many times. Data is more important than code, and databases are
the repositories of data in most enterprises.

You can modernize a legacy application written in other languages or frameworks by
importing their database structure into Django. As an immediate advantage, you can use
the Django admin interface to view and change your legacy data.

Django makes this easy with the `inspectdb` management command, which looks as
follows:

```bash
$ python manage.py inspectdb > models.py
```

This command, if run while your settings are configured to use the legacy database, can
automatically generate the Python code that will go into your models file. By default, these
models are unmanaged, that is, `managed = False`. In this state, Django will not control
the model's creation, modification, or deletion.

Here are some best practices if you are using this approach to integrate in a legacy
database:

- Know the limitations of Django ORM beforehand. Currently, multicolumn
(composite) primary keys and NoSQL databases are not supported.

- Don't forget to manually clean up the generated models; for example, remove the
redundant `id` fields since Django creates them automatically.

- Foreign key relationships may have to be manually defined. In some databases,
the autogenerated models will have them as integer fields (suffixed with `_id`).

- Organize your models into separate apps. Later, it will be easier to add the views,
forms, and tests in the appropriate folders.

- Remember that running the migrations will create Django's administrative tables
(`django_*` and `auth_*`) in the legacy database

In an ideal world, your autogenerated models will immediately start working, but in
practice, it takes a lot of trial and error. Sometimes, the data type that Django inferred
might not match your expectations. In other cases, you might want to add additional meta-
information, such as `unique_together`, to your model.

Eventually, you should be able to see all the data that was locked inside that aging PHP
application in your familiar Django admin interface. I am sure this will bring a smile to
your face.

## Future proofing

A well-written code base is a pleasure to work with. A poorly organized and brittle code
base usually ends up as legacy code and hinders innovation. So how can you reduce the
chances of your application being considered as legacy? Here are some recommendations:

- **Django deprectations**: Deprectations tell you whether a feature or idiom will be
discontinued from Django in the future. Since Django 1.11, they are quiet by
default. Use `python -Wd` so that deprecation warnings do appear.
- **Code reviews**: Ensure high code quality and encourage best practices in reviews.
- **Consistent Formatting**: Use a code formatter like `black` before committing code
to reduce review time
- Increase code coverage: Write more tests, especially unit tests.
- **Type hinting**: Use type hinting to perform static analysis of Python 3 code and
reduce the number of test cases.
- **Configuration management**: Have strong version control and other
configuration management practices to ensure replicable environments and
painless rollbacks. This includes using a host of tools from Git to Ansible, while
having an agile DevOps culture.

## Summary

In this chapter, we looked at various techniques to understand the legacy code. Reading
code is often an underrated skill. However, rather than reinventing the wheel, we need to
judiciously reuse good working code whenever possible. In this chapter, and throughout
the rest of the book, we emphasize the importance of writing test cases as an integral part of
coding.

In the next chapter, we will talk about writing test cases and the often frustrating task of
debugging that follows this.

---

<a name="footnote-1">1</a>:   محیط، منظور محیط شبکه است که در واقع مرز بین شبکه داخلی امن یک سازمان و هر شبکه خارجی کنترل نشده دیگری مثل اینترنت است.  در اینجا اشاره به نفوذ به داخل شبکه آن سازمان توسط حملات سایبری دارد.

<a name="footnote-2">2</a>:  زمانی از این اصطلاح استفاده می شود که فرد به تئوری های توطئه اعتقاد دارد و یا اصطلاحا اعتقاد به این دارد که رویداد فعلی نتیجه نقشه های مخفی افراد قدرتمند هستند



