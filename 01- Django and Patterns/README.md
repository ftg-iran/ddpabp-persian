# جنگو الگوها

در این فصل در مورد موضوعات زیر صحبت خواهیم کرد:
* چرا جنگو؟
* داستان جنگو
* جنگو چگونه کار می کند؟
* الگو چیست؟
* مجموعه های الگوهای شناخته شده
* الگوها در جنگو

بر اساس گزارش جهانی استارتاپ بووی گای، در سال 2013 بیش از 136000 شرکت اینترنتی در سراسر جهان وجود داشت که بیش از 60000 شرکت فقط در آمریکا وجود داشت. از این تعداد، 87 شرکت آمریکایی بیش از یک میلیارد دلار ارزش دارند. مطالعه دیگری می گوید که از 12000 نفر بین 18 تا 30 سال در 27 کشور، بیش از دو سوم فرصت هایی را برای کارآفرین شدن می بینند.

این رونق کارآفرینی در استارت آپ های دیجیتال در درجه اول به دلیل ارزان شدن و فراگیر شدن ابزارها و فناوری های استارت آپ ها است. ایجاد یک برنامه وب کامل به لطف فریمورک های قدرتمند، زمان و مهارت بسیار کمتری نسبت به گذشته می طلبد.

فیزیکدانان، مربیان، هنرمندان و بسیاری دیگر بدون پیشینه مهندسی نرم افزار در حال ایجاد برنامه های کاربردی مفیدی هستند که به طور قابل توجهی در حال پیشرفت حوزه خود هستند. با این حال، آنها ممکن است از اصول طراحی مهندسی نرم افزار مورد نیاز برای ساخت نرم افزار بزرگ و قابل نگهداری آگاه نباشند.

مطالعه چهار پیاده‌سازی مختلف از یک برنامه کاربردی مبتنی بر وب در نروژ نشان داد که پیاده‌سازی‌هایی با بوهای کد شناخته شده و طرح‌های ضد الگو مستقیماً با مشکلات نگهداری مرتبط هستند. نرم افزاری که طراحی ضعیفی دارد ممکن است به همان اندازه کار کند، اما انطباق با الزامات در حال تحول در دنیایی که به سرعت در حال تغییر است، دشوار است.

مبتدی ها اغلب مشکلات طراحی را در اواخر پروژه خود کشف می کنند. به زودی، آنها سعی می کنند همان مشکلاتی را که دیگران با آن مواجه شده اند، حل کنند. اینجاست که درک الگوها واقعاً می تواند به صرفه جویی در وقت آنها کمک کند.

### چرا جنگو؟

هر برنامه وب متفاوت است، مانند یک تکه مبلمان دست ساز. به ندرت یک مبل تولید انبوه پیدا می کنید که تمام نیازهای شما را به خوبی برآورده کند. حتی اگر با یک نیاز اساسی مانند وبلاگ یا شبکه اجتماعی شروع کنید، نیازهای شما به آرامی افزایش می‌یابد و به راحتی می‌توانید با بسیاری از محلول‌های نیمه‌پخت که با چسب نواری روی محلول‌های کاتر کوکی‌ها چسبانده شده‌اند، خاتمه دهید.

به همین دلیل است که FrameWork های وب مانند جنگو یا ریل بسیار محبوب شده اند. FrameWork‌ها توسعه را سرعت می‌بخشند و بهترین روش‌ها را در خود دارند. با این حال، آنها همچنین به اندازه کافی انعطاف‌پذیر هستند تا به شما امکان دسترسی به لوله‌کشی کافی برای کار را بدهند. امروزه فریم ورک های وب در همه جا وجود دارند و اکثر زبان های برنامه نویسی حداقل یک فریم ورک انتها به انتها مشابه جنگو دارند.

احتمالا پایتون نسبت به بسیاری از زبان های برنامه نویسی FrameWork های وب بیشتری دارد. نگاهی گذرا به فهرست بسته پایتون (PyPI) 13045 بسته شگفت‌انگیز مربوط به محیط‌های وب را نشان می‌دهد. برای جنگو، مجموع 9091 بسته است. ویکی پایتون بیش از 54 FrameWork وب فعال را فهرست می‌کند که محبوب‌ترین آنها جنگو، فلاسک، پیرامید و زوپ است. پایتون همچنین دارای تنوع گسترده ای در فریمورک ها است. فریم ورک میکرو وب بطری فشرده تنها یک فایل پایتون است که هیچ وابستگی ندارد و به طرز شگفت انگیزی قادر به ایجاد یک برنامه وب ساده است.

علی‌رغم این گزینه‌های فراوان، جنگو با اختلاف زیادی به عنوان یک مورد علاقه بزرگ ظاهر شده است. Djangosites.org بیش از 5263 سایت نوشته شده در جنگو را فهرست می کند، از جمله داستان های موفقیت معروفی مانند اینستاگرام، پینترست، و Disqus. همانطور که توضیحات رسمی می گوید، جنگو (https://djangoproject.com) یک FrameWork وب سطح بالا پایتون است که توسعه سریع و طراحی تمیز و عملی را تشویق می کند. به عبارت دیگر، این یک FrameWork وب کامل با باتری هایی است که دقیقاً مانند پایتون در آن گنجانده شده است. رابط مدیریت خارج از جعبه، یکی از ویژگی های منحصر به فرد جنگو، برای ورود و مدیریت اولیه داده ها بسیار مفید است. مستندات جنگو به دلیل اینکه برای یک پروژه منبع باز بسیار خوب نوشته شده است مورد تحسین قرار گرفته است. در نهایت، جنگو در چندین وب سایت پر ترافیک آزمایش شده است. تمرکز فوق‌العاده دقیقی بر امنیت با محافظت در برابر حملات رایج مانند اسکریپت‌های متقاطع (XSS)، جعل درخواست‌های متقابل سایت (CSRF) تا تهدیدات امنیتی در حال تکامل مانند الگوریتم‌های هش رمز عبور ضعیف است

اگرچه می‌توانید از جنگو برای ساخت هر نوع برنامه وب در تئوری استفاده کنید، اما ممکن است برای هر موردی بهترین نباشد. به عنوان مثال، برای نمونه سازی اولیه یک وب سرویس ساده در یک سیستم تعبیه شده با محدودیت های حافظه فشرده، ممکن است بخواهید از Flask استفاده کنید، در حالی که ممکن است در نهایت به دلیل استحکام و ویژگی های آن به جنگو بروید. ابزار مناسب برای کار را انتخاب کنید.

اگر به سایر FrameWork های وب عادت داشته باشید، برخی از ویژگی های داخلی، مانند رابط مدیر، ممکن است عجیب به نظر برسد. برای درک طراحی جنگو، بیایید دریابیم که چگونه به وجود آمد.


## داستان جنگو

وقتی به اهرام مصر نگاه می کنید، فکر می کنید که چنین طراحی ساده و مینیمال باید کاملاً آشکار باشد. در حقیقت، آنها محصول 4000 سال تکامل معماری هستند. اهرام پله ای، طرح اولیه (و درهم و برهم)، دارای شش بلوک مستطیل شکل در حال کاهش بود.
چندین بار اصلاحات معماری و مهندسی طول کشید تا اینکه سازه‌های آهکی مدرن، لعاب‌دار و بادوام اختراع شدند.

با نگاه کردن به جنگو، ممکن است احساس مشابهی داشته باشید - آنقدر زیبا ساخته شده است که باید بی عیب و نقص تصور شده باشد. برعکس، نتیجه بازنویسی‌ها و تکرارهای سریع در یکی از پرفشارترین محیط‌های قابل تصور بود - اتاق خبر!

در پاییز 2003، دو برنامه نویس، *آدریان هولواتی* و *سایمون ویلیسون* که در روزنامه *لارنس ژورنال-ورلد* کار می کردند، مشغول ایجاد چندین وب سایت خبری محلی در کانزاس بودند. این سایت‌ها، از جمله *LJWorld.com*، *Lawrence.com*، و *KUsports.com*، مانند بسیاری از سایت‌های خبری، نه تنها درگاه‌های محتوا محور مملو از متن، عکس و ویدئو بودند، بلکه دائماً سعی می‌کردند نیازهای مردم را برآورده کنند. جامعه محلی لارنس با برنامه‌هایی مانند فهرست راهنمای کسب‌وکار محلی، تقویم رویدادها و آگهی‌ها.


#### یک FrameWork متولد می شود

البته این به معنای کار زیاد برای سایمون، آدریان و بعدها جاکوب کاپلان ماس بود که به تیم آنها پیوسته بودند. با مهلت های بسیار کوتاه، گاهی اوقات تنها با چند ساعت اطلاع رسانی. از آنجایی که اولین روزهای توسعه وب در پایتون بود، آنها مجبور بودند برنامه های وب را عمدتاً از ابتدا بنویسند. بنابراین، برای صرفه جویی در زمان گرانبها، آنها به تدریج ماژول ها و ابزارهای رایج را به چیزی به نام *CMS* تغییر دادند.

در نهایت، بخش‌های مدیریت محتوا به پروژه‌ای جداگانه به نام Ellington CMS تبدیل شد که به یک محصول تجاری موفق CMS تبدیل شد. بقیه CMS یک FrameWork زیربنایی منظم بود که به اندازه کافی عمومی بود که برای ساخت برنامه های کاربردی وب از هر نوع استفاده شود.

تا جولای 2005، این FrameWork توسعه وب به عنوان جنگو (تلفظ Jang-Oh) تحت مجوز منبع باز توزیع نرم افزار برکلی (BSD) منتشر شد. این نام از گیتاریست افسانه ای جاز جنگو راینهارت گرفته شد. و بقیه، همانطور که می گویند، تاریخ است.

#### حذف جادو

جنگو به دلیل خاستگاه فروتنانه‌اش به عنوان یک ابزار داخلی، دارای موارد عجیب و غریب مخصوص لارنس ژورنال جهان بود. برای اینکه جنگو واقعاً هدف کلی باشد، تلاشی با عنوان حذف لارنس قبلاً در حال انجام بود.

با این حال، مهم ترین تلاش برای بازسازی که توسعه دهندگان جنگو باید انجام می دادند Removing the Magic نام داشت. این پروژه بلندپروازانه شامل پاکسازی تمام زگیل‌هایی بود که جنگو در طول سال‌ها جمع‌آوری کرده بود، از جمله جادوی زیادی (یک اصطلاح غیررسمی برای ویژگی‌های ضمنی) و جایگزینی آنها با کد پایتونیک طبیعی‌تر و صریح‌تر. برای مثال، کلاس‌های مدل به جای اینکه مستقیماً از ماژول `models.py` که در آن تعریف شده بودند وارد شوند، از یک ماژول جادویی به نام `django.models.*` وارد می‌شدند.

در آن زمان، جنگو حدود صد هزار خط کد داشت و بازنویسی قابل توجهی از API بود. در 1 می 2006، این تغییرات، تقریباً به اندازه یک کتاب کوچک، در تنه نسخه توسعه‌دهنده جنگو ادغام شدند و با نسخه 0.95 جنگو منتشر شدند. این یک گام مهم به سوی نقطه عطف جنگو 1.0 بود.

#### جنگو مدام بهتر می شود

هر ساله کنفرانس هایی به نام DjangoCons در سرتاسر جهان برای توسعه دهندگان جنگو برگزار می شود تا بتوانند با یکدیگر ملاقات کنند و با یکدیگر تعامل داشته باشند. آنها یک سنت شایان ستایش در ارائه یک سخنرانی نیمه طنز در مورد اینکه چرا جنگو بد است، دارند. این می تواند عضوی از جامعه جنگو یا شخصی باشد که روی FrameWork های وب رقیب کار می کند یا هر شخصیت برجسته ای باشد. در طول سال‌ها، شگفت‌انگیز است که چگونه توسعه‌دهندگان جنگو این انتقادات را مثبت می‌گرفتند و در نسخه‌های بعدی آن را کاهش می‌دادند.

در اینجا خلاصه‌ای از پیشرفت‌های مربوط به چیزی است که زمانی در جنگو یک کاستی بود و نسخه‌ای که در آن برطرف شد:
* کتابخانه جدید مدیریت فرم (Django 0.96)
* جداسازی ادمین از مدل ها (Django 1.0)
* پشتیبانی از چندین پایگاه داده (Django 1.2)
* مدیریت بهتر فایل های استاتیک (Django 1.3)
* پشتیبانی بهتر از منطقه زمانی (Django 1.4)
* مدل کاربر قابل تنظیم (Django 1.5)
* مدیریت بهتر تراکنش (جنگو 1.6)
* انتقال پایگاه داده داخلی (جنگو 1.7)
* موتورهای قالب چندگانه (جنگو 1.8)
* نحو ساده شده مسیریابی URL (Django 2.0)

با گذشت زمان، جنگو به یکی از اصطلاحی ترین پایگاه های کد پایتون در حوزه عمومی تبدیل شده است. کد منبع جنگو همچنین مکانی عالی برای یادگیری معماری یک FrameWork وب بزرگ پایتون است.

### جنگو چگونه کار می کند؟
برای درک واقعی جنگو، باید زیر کاپوت را نگاه کنید و قسمت های متحرک مختلف داخل آن را ببینید. این می تواند هم روشنگر و هم طاقت فرسا باشد. اگر قبلاً با اطلاعات زیر آشنا هستید، ممکن است بخواهید از این بخش صرفنظر کنید:



![How web requests are processed in a typical Django application](./images/image.MSTBH1.png)
*How web requests are processed in a typical Django application* 

نمودار قبلی سفر ساده درخواست وب از مرورگر بازدیدکننده به برنامه جنگو و بازگشت را نشان می دهد. مسیرهای شماره گذاری شده به شرح زیر است:

1. مرورگر درخواست را (در اصل یک رشته بایت) به وب سرور شما ارسال می کند.
2. وب سرور شما (مثلاً Nginx) درخواست را به یک سرور رابط دروازه وب سرور (WSGI) (مثلا uWSGI) تحویل می دهد یا مستقیماً یک فایل (مثلاً یک فایل CSS) را از سیستم فایل ارائه می دهد.
3. برخلاف وب سرور، سرورهای WSGI می توانند برنامه های پایتون را اجرا کنند. این درخواست یک فرهنگ لغت پایتون به نام `environ` را پر می کند و به صورت اختیاری، از چندین لایه میان افزار عبور می کند و در نهایت به برنامه جنگو شما می رسد.
4. URLconf (پیکربندی URL) ماژول موجود در `urls.py` پروژه شما، یک نمای را برای رسیدگی به درخواست بر اساس URL درخواستی انتخاب می کند. درخواست به HttpRequest، یک شی پایتون تبدیل شده است.
5. نمای انتخاب شده معمولاً یک یا چند مورد از کارهای زیر را انجام می دهد: 
a. از طریق مدل ها با پایگاه داده صحبت می کند.
b. HTML یا هر پاسخ فرمت شده دیگری را با استفاده از Template ارائه می دهد
c. یک متن ساده را بر میگرداند ( نشان داده نمیشود)
d. در صورت وجود، یک exception بر میگرداند
6. شیع `HttpResponse` به متن تبدیل (Render) میشود.
7. یک صفحه وب با رندر زیبا در مرورگر شما دیده می شود.

اگرچه جزئیات خاصی حذف شده است، این نمایش باید به شما در درک معماری سطح بالای جنگو کمک کند. همچنین نقش‌هایی را که اجزای کلیدی بازی می‌کنند، مانند مدل‌ها، نماها و قالب‌ها نشان می‌دهد. بسیاری از اجزای جنگو بر اساس چندین الگوی طراحی شناخته شده هستند.

### What is a pattern?
What is common between the words **blueprint**, **scaffolding**, and **maintenance**? These
software development terms have been borrowed from the world of building construction
and architecture. However, one of the most influential terms comes from a treatise on
architecture and urban planning written in 1977 by the leading Austrian architect
Christopher Alexander and his team consisting of Murray Silverstein, Sara Ishikawa, and
several others.

The term pattern came in vogue after their seminal work, *A Pattern Language: Towns,
Buildings, Construction* (volume 2 in a five-book series), based on the astonishing insight that
users know about their buildings more than any architect ever could. A pattern refers to an
everyday problem and its proposed but time-tested solution.
In the book, Christopher Alexander states the following:

<p align="center">
<i>"Each pattern describes a problem, which occurs over and over again in our environment,
and then describes the core of the solution to that problem in such a way that you can use
this solution a million times over, without ever doing it the same way twice."</i>
</p> 

For example, his *wings of light* pattern describe how people prefer buildings with more
natural lighting and suggests arranging the building so that it is composed of wings. These
wings should be long and narrow, never more than 25 feet wide. Next time you enjoy a
stroll through the long well-lit corridors of an old university, be grateful to this pattern.

Their book contained 253 such practical patterns, from the design of a room to the design of
an entire city. Most importantly, each of these patterns gave a name to an abstract problem
and together formed a *pattern language*.

Remember when you first came across the word déjà vu? You probably thought: "*wow, I
never knew that there was a word for that experience.*" Similarly, architects were not only able to
identify patterns in their environment but could also, finally, name them in a way that their
peers could understand.

In the world of software, the term design pattern refers to a general repeatable solution to a
commonly occurring problem in software design. It is a formalization of best practices that
a developer can use. Like in the world of architecture, the pattern language has proven to
be extremely helpful to communicate a certain way of solving a design problem to other
programmers.

There are several collections of design patterns, but some have been considerably more
influential than the others.

#### Gang of four patterns
One of the earliest efforts to study and document design patterns was a book titled *Design
Patterns: Elements of Reusable Object-Oriented Software* by *Erich Gamma*, *Richard Helm*, *Ralph
Johnson*, and *John Vlissides*, who later became known as the **Gang of Four (GoF)**. This book
is so influential that many consider the 23 design patterns in the book as fundamental to
software engineering itself.

In reality, the patterns were written primarily for static object-oriented programming
languages, and it had code examples in C++ and Smalltalk. As we will see shortly, some of
these patterns might not even be required in other programming languages with better
higher-order abstractions such as Python.

The 23 patterns have been broadly classified by their type as follows:

* **Creational patterns:** These include abstract factory, builder pattern, factory
method, prototype pattern, and singleton pattern

* **Structural patterns:** These include adapter pattern, bridge pattern, composite
pattern, decorator pattern, facade pattern, flyweight pattern, and proxy pattern

* **Behavioral patterns:** These include chain-of-responsibility, command pattern,
interpreter pattern, iterator pattern, mediator pattern, memento pattern, observer
pattern, state pattern, strategy pattern, template pattern, and visitor pattern

While a detailed explanation of each pattern would be beyond the scope of this book, it
would be interesting to identify some of these patterns present in Django implementation
itself:

| **GoF Pattern**   | **Django Component**      | **Explanation**    
| Command pattern   | HttpRequest               | This encapsulates a request in an object                                                         |
| Observer pattern  | Signals                   | When one object changes state, all its listeners are notified and updated automatically          |
| Template method   | Class-based generic views | Steps of an algorithm can be redefined by subclassing without changing the algorithm's structure |

While these patterns are mostly of interest to those studying the internals of Django, the
most commonly question asked is, under which pattern is Django itself classified?

#### Is Django MVC?
**Model-View-Controller (MVC)** is an architectural pattern invented by Xerox PARC in the
70s. Being the framework used to build user interfaces in Smalltalk, it gets an early mention
in the GoF book.

Today, MVC is a very popular pattern in web application frameworks. A variant of the
common question is whether Django is an MVC framework.

The answer is both yes and no. The MVC pattern advocates the decoupling of the
presentation layer from the application logic. For instance, while designing an online game
website API, you might present a game's high scores table as an HTML, XML, or **comma-
separated values (CSV)** file. However, its underlying model class would be designed
independently of how the data would be finally presented.

MVC is very rigid about what models, views, and controllers do. However, Django takes a
much more practical view to web applications. Due to the nature of the HTTP protocol,
each request for a web page is independent of any other request. Django's framework is
designed like a pipeline to process each request and prepare a response.

Django calls this the **Model-Template-View (MTV)** architecture. There is a separation of
concerns between the database interfacing classes (model), request-processing classes
(view), and a templating language for the final presentation (template).

If you compare this with the classic MVC — a model is comparable to Django's Models; a
view is usually Django's Templates, and the controller is the framework itself that processes
an incoming HTTP request and routes it to the correct view function.

If this has not confused you enough, Django prefers to name the callback function to handle
each URL a view function. This is, unfortunately, not related to the MVC pattern's idea of a
view.

#### Fowler's patterns
In 2002, Martin Fowler wrote *Patterns of Enterprise Application Architecture*, which described
40 or so patterns he often encountered while building enterprise applications.

Unlike the GoF book, which described design patterns, Fowler's book was about
architectural patterns. Hence, they describe patterns at a much higher level of abstraction
and are largely programming language agnostic.

Fowler's patterns are organized as follows:
* **Domain logic patterns:** These include domain model, transaction script, service
layer, and table module
* **Data source architectural patterns:** These include row data gateway, table data
gateway, data mapper, and active record
* **Object-relational behavioral patterns:** These include Identity Map, Unit of
Work, and Lazy Load
* **Object-relational structural patterns:** These include Foreign Key Mapping,
Mapping, Dependent Mapping, Association Table Mapping, Identity Field,
Serialized LOB, Embedded Value, Inheritance Mappers, Single Table Inheritance,
Concrete Table Inheritance, and Class Table Inheritance
* **Object-relational metadata mapping patterns:** These include Query Object,
Metadata Mapping, and repository
* **Web presentation patterns:** These include Page Controller, Front Controller,
Model View Controller, Transform View, Template View, Application
Controller, and Two-Step View
* **Distribution patterns:** These include Data Transfer Object and Remote Facade
* **Offline concurrency patterns:** These include Coarse-Grained Lock, Implicit
Lock, Optimistic Offline Lock, and Pessimistic Offline Lock
* **Session state patterns:** These include Database Session State, Client Session State,
and Server Session State
* **Base patterns:** These include Mapper, Gateway, Layer Supertype, Registry,
Value Object, Separated Interface, Money, Plugin, Special Case, Service Stub, and
Record Set

Almost all of these patterns would be useful to know while architecting a Django
application. In fact, Fowler's website at `http:/​/martinfowler.​com/​eaaCatalog/`​ has an
excellent catalog of these patterns online. I highly recommend that you check them out.

Django also implements a number of these patterns. The following table lists a few of them:

| **Fowler pattern**          | **Django component**      | **Explanation**    
|:---------------------------:|:-------------------------:|:-----------------------------------------------------------------:|
| Active record               | Django models             | Encapsulate the database access and add domain logic on that data |
| Class table inheritance     | Model inheritance         | Each entity in the hierarchy is mapped to a separate table        |
| Identity field              | ID field                  | Saves a database ID field in an object to maintain identity       |
|Template view                | Django templates          |‌ Render into HTML by embedding markers in HTML                     |

####Are there more patterns?
Yes, of course. Patterns are discovered all the time. Like living beings, some mutate and
form new patterns, for instance, MVC variants such as **Model-view-presenter (MVP)**,
**Hierarchical model-view-controller (HMVC)**, or **Model View ViewModel (MVVM)**.

Patterns also evolve with time, as better solutions to known problems are identified. For
example, Singleton pattern was once considered to be a design pattern but now is
considered to be an **anti-pattern** due to the shared state it introduces, similar to using
global variables. An anti-pattern can be defined as a commonly reinvented but a bad
solution to a problem. Some of the other well-known books that catalog patterns are
**Pattern-oriented software architecture (POSA)** by Buschmann, Meunier, Rohnert,
Sommerlad, and Sta; *Enterprise Integration Patterns by Hohpe* and Woolf; and *The Design of
Sites: Patterns, Principles, and Processes for Crafting a Customer-Centered Web Experience by
Duyne, Landay, and Hong*.

###Patterns in this book
This book will cover Django-specific design and architecture patterns, which would be
useful to a Django developer. This is how each pattern will be presented:

**Pattern name

The heading is the pattern name. If it is a well-known pattern, the commonly used name is
used; otherwise, a terse, self-descriptive name has been chosen. Names are important, as
they help in building the pattern vocabulary. All patterns will have the following parts:

* Problem: This briefly mentions the problem
* Solution: This summarizes the proposed solution(s)
* Problem Details: This elaborates the context of the problem and possibly gives an example
* Solution Details: This explains the solution(s) in general terms and provides a sample Django implementation

####Criticism of patterns
Despite their near universal usage, patterns have their share of criticism too. The most
common arguments against them are as follows:

* **Patterns compensate for the missing language features:** Peter Norvig found that
16 of the 23 patterns in design patterns were invisible or simpler in dynamic
languages such as Lisp or Python. For instance, as functions are already objects in
Python, it would be unnecessary to create separate classes to implement strategy
patterns.
* **Patterns repeat best practices:** Many patterns are essentially formalizations of
best practices, such as separation of concerns, and could seem redundant.
* **Patterns can lead to over-engineering:** Implementing the pattern might be less
efficient and excessive compared to a simpler solution.

####How to use patterns
Although some of the previous criticisms are quite valid, they are based on how patterns
are misused. Here is some advice that can help you understand how best to use design
patterns:
* Patterns are best used to communicate that you are following a well-understood
design approach
* Don't implement a pattern if your language supports a direct solution
* Don't try to retrofit everything in terms of patterns
* Use a pattern only if it is the most elegant solution in your context
* Don't be afraid to create new patterns

#### Python Zen and Django's design philosophy
Generally, the Python community uses the term *Pythonic* to describe a piece of idiomatic
code. It typically refers to the principles laid out in *The Zen of Python*. Written like a poem, it
is extremely useful to describe such a vague concept.

**Tip: Try entering `import this` in a Python prompt to view *The Zen of Python*. 

Furthermore, Django developers have crisply documented their design philosophies while
designing the framework at `https:/​/docs.​djangoproject.​com/en/​dev/​misc/​design-philosophies/​`.

While the document describes the thought process behind how Django was designed, it is
also useful for developers using Django to build applications. Certain principles such as
**Don't Repeat Yourself (DRY)**, **loose coupling**, and **tight cohesion** can help you write more
maintainable and idiomatic Django applications.

Django or Python best practices suggested by this book would be formatted in the
following manner:

**Tip: Use `BASE_DIR` in `settings.py` and avoid hardcoding directory names.

###Summary
In this chapter, we looked at why people choose Django over other web frameworks, its
interesting history, and how it works. We also examined design patterns, popular pattern
collections, and best practices.

In the next chapter, we will take a look at the first few steps in the beginning of a Django
project, such as gathering requirements, creating mockups, and setting up the project.




