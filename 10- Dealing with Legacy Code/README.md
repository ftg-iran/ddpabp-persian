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


## یافتن نسخه جنگو

در حالت ایده آل، هر پروژه ای یک فایل requirements.txt یا setup.py در دایرکتوری اصلی خود دارد، و داخل آن نسخه دقیق جنگو استفاده شده وجود دارد. 
 
 `Django==1.5.9`

شماره نسخه دقیقا ذکر شده است (به جای Django>=1.5.9) که به آن پینینگ می گویند. پینینگ هر بسته یک عمل خوب در نظر گرفته می‌شود، زیرا مشکلات پیش‌بینی نشده را کاهش می‌دهد و ساخت پروژه  شما را قطعی‌تر می‌کند.


به عنوان بهترین روش، ایجاد یک محیط کاملاً تکرارپذیر برای یک پروژه توصیه می شود. این محیط شامل داشتن یک فایل نیازمندی‌ها با تمام وابستگی‌های مختلف لیست شده(پینینگ) به همراه خروجی یک تابع هش است. –خروجی تابع هش بسته‌ها به این صورت است:

`Django==1.5.9 --hash=sha256:2cf24dba5fb0a30e26e83b2ac5...`

هش ها در برابر دستکاری از راه دور محافظت می کنند و نیاز به ایجاد سرورهای فهرست بسته خصوصی حاوی بسته های تایید شده را کاهش می دهند. متأسفانه، پایگاه‌های کد در دنیا واقعی هستند که در آن‌ها فایل requires.txt به‌روزرسانی نشده یا حتی اصلاً وجود ندارد. در چنین مواردی، برای یافتن نسخه دقیق باید علائم مختلف را بررسی کنید.

## فعال سازی محیط مجازی

در بیشتر موارد، یک پروژه جنگو در یک محیط مجازی دیپلوی  می شود. هنگامی که محیط مجازی پروژه را پیدا کردید، می توانید آن را با رفتن به آن دایرکتوری و اجرای اسکریپت فعال شده برای سیستم عامل خود فعال کنید.

برای لینوکس، دستور به صورت زیر است:

```bash
$ source venv_path/bin/activate
```

هنگامی که محیط مجازی فعال شد، یک شل پایتون را راه اندازی کنید و نسخه جنگو را با دستورات زیر، همانطور که در زیر نشان داده شده است مشاهده خواهید کرد:

```bash
$ python
>>> import django
>>> print(django.get_version())
1.5.9
```
نسخه جنگو استفاده شده در این مورد نسخه `1.5.9` است. همچنین، می‌توانید اسکریپت `manage.py` را در پروژه اجرا کنید تا خروجی مشابهی دریافت کنید:

```bash
$ python manage.py --version
1.5.9
```
با این حال، اگر سورس کد پروژه قدیمی به صورت دیپلوی نشده برای شما ارسال شده باشد، این گزینه در دسترس نخواهد بود. اگر محیط مجازی (و بسته ها) نیز گنجانده شده بود، می توانید به راحتی شماره نسخه (به شکل یک تاپل) را در فایل `__init__.py` دایرکتوری جنگو پیدا کنید. مثال داده شده را در نظر بگیرید:

```bash
$ cd envs/foo_env/lib/python2.7/site-packages/django
$ cat __init__.py
VERSION = (1, 5, 9, 'final', 0)
...
```

اگر به کمک روش‌های ذکر شده موفق به یافتن نسخه جنگو نشدید، باید یادداشت‌های نسخه‌های منتشر شده قدیمی جنگو را مرور کنید تا تغییرات قابل شناسایی را تعیین کنید (به عنوان مثال، تنظیم `AUTH_PROFILE_MODULE` از نسخه 1.5 منسوخ شده است) و آنها را با کد خود مطابقت دهید. هنگامی که نسخه صحیح جنگو را مشخص کردید، می توانید به سراغ تجزیه و تحلیل کد بروید.


[Pipenv](https://docs.pipenv.org/), یک ابزار جدید بسته بندی پایتون است اما ،[ به طور رسمی توصیه شده است](https://packaging.python.org/tutorials/managing-dependencies/#installing-pipenv) چرا که بسیاری از این مشکلات را حل می‌کند. این ابزار عملکرد `pip` و `virtualenv` را با هم ترکیب می کند به طوری که وقتی یک بسته را نصب می کنید، فایل مورد نیاز آن (به نام pipenv) را به طور خودکار به روز می کند نکته مهم آخر اینکه، بیلدهای تکرار پذیر با استفاده از یک فایل `Pipenv.lock`، که کاملاً پین شده و شامل هش است، فعال می‌کند.

## فایل ها کجا هستند؟ این PHP نیست

یکی از سخت‌ترین تصورها برای عادت کردن (مخصوصاً اگر اهل دنیای PHP یا ASP.NET هستید) این است که فایل‌های منبع در دایرکتوری ریشه پوشه وب سرور شما( که معمولاً `wwwroot` یا `public_html` نامیده می‌شود) قرار نگیرند. علاوه بر این، هیچ رابطه مستقیمی بین ساختار دایرکتوری کد و ساختار URL وب سایت وجود ندارد.

در واقع، متوجه خواهید شد که کد منبع وب سایت جنگو شما در یک مسیر مبهم مانند `/opt/webapps/my-django-app` ذخیره شده است. چرا اینطور هست؟ در میان بسیاری از دلایل خوب، انتقال داده های محرمانه خود به خارج از ریشه وب عمومی شما اغلب ایمن تر است. به این ترتیب، یک خزنده وب نمی تواند به طور تصادفی به لیست کد منبع شما برخورد کند.

همانطور که در `فصل 13`(آمادگی برای محیط پروداکشن) خواهید خواند، محل کد منبع را می توان با بررسی فایل پیکربندی وب سرور خود پیدا نمایید. در اینجا، متغیر محیطی `DJANGO_SETTINGS_MODULE` را می‌بینید که روی مسیر ماژول تنظیم شده است، یا درخواست را به سرور WSGI ارسال می‌کند که برای اشاره به فایل `project.wsgi` شما پیکربندی خواهد شد.

## شروع با urls.py

حتی اگر به کل کد منبع یک سایت جنگو دسترسی داشته باشید، فهمیدن نحوه عملکرد آن در برنامه های مختلف می تواند دشوار باشد. اغلب، بهتر است از `URLconf` واقع در فایل `urls.py` شروع کنید، زیرا به معنای واقعی کلمه یک نقشه است که هر درخواست را به نماهای مربوطه مرتبط می کند.


با برنامه‌های معمولی پایتون، من اغلب از ابتدای اجرای آن شروع به خواندن می‌کنم – مثلاً از ماژول اصلی سطح بالا یا هرجا که اصطلاح چک `__main__` شروع می‌شود. در مورد برنامه‌های جنگو، من معمولاً با `urls.py` شروع می‌کنم زیرا دنبال کردن جریان اجرای کد بر اساس الگوهای URL مختلف یک سایت آسان‌تر است.

در لینوکس، می توانید از دستور `find` به صورت زیر برای یافتن محل فایل `settings.py` و خط مربوطه که ریشه `urls.py` را مشخص می کند استفاده کنید:


```bash
$ find . -iname settings.py -exec grep -H 'ROOT_URLCONF' {} \;
./projectname/settings.py:ROOT_URLCONF = 'projectname.urls'
$ ls projectname/urls.py
projectname/urls.py
```

## پرش در اطراف کد

گاهی اوقات خواندن کد مانند مرور صفحات وب بدون لینک است. هنگامی که با یک تابع یا متغیری روبرو می شوید که در جای دیگری تعریف شده است، باید به فایلی که حاوی آن تعریف است بروید. برخی از IDE ها می توانند این کار را به صورت خودکار برای شما انجام دهند به شرطی که به آن ها بگویید که کدام فایل ها را به عنوان بخشی از پروژه ردیابی کند.

اگر به جای آن از Emacs یا Vim استفاده می کنید، می توانید یک فایل TAGS برای پیمایش سریع بین فایل ها ایجاد کنید. به پوشه اصلی پروژه بروید و ابزاری به نام  **Exuberant Ctags** را به صورت زیر اجرا کنید:

```bash
find . -iname "*.py" -print | etags -
```
این یک فایل به نام TAGS ایجاد می کند که حاوی اطلاعات موقعیت است، جایی که هر واحد نحوی، مانند کلاس ها و توابع، تعریف شده است. در Emacs، می توانید تعریف تگ را پیدا کنید، جایی که مکان نما (یا نقطه همانطور که در Emacs نامیده می شود) با استفاده از فرمان `M-` است. 

در حالی که استفاده از یک فایل تگ برای کد بزرگ بسیار سریع است، اما کاملاً ابتدایی است و از یک محیط مجازی (جایی که بیشتر تعاریف ممکن است قرار داشته باشند) آگاه نیست. یک جایگزین عالی استفاده از بسته `elpy` در Emacs است. می توان آن را برای شناسایی یک محیط مجازی پیکربندی کرد. پرش به تعریف یک عنصر نحوی با استفاده از همان فرمان `M-` است. با این حال، جستجو به فایل برچسب محدود نمی‌شود، بنابراین می‌توانید به طور یکپارچه به تعریف کلاس در کد منبع جنگو بروید. اکثر IDE ها این ویژگی را تحت نام `Navigate/Go
to definition` ارائه می کنند. 

## درک کردن پایه‌ی کد

یافتن کد قدیمی با مستندات خوب بسیار نادر است. حتی اگر این کار را انجام دهید، ممکن است اسناد تا حدی با کد هماهنگ نباشد که می‌تواند منجر به مشکلات بیشتر شود. اغلب، بهترین راهنما برای درک عملکرد برنامه، اجرای کدهای تست و یا اجرای خود کد است. اسناد رسمی جنگو بر اساس نسخه هایی در [https://docs.djangoproject.com](https://docs.djangoproject.com) سازماندهی شده است. در هر صفحه‌ای، می‌توانید به سرعت به صفحه مربوطه در نسخه‌های قبلی جنگو (با یک انتخابگر در قسمت پایین سمت راست صفحه) بروید: 

![image 01](1.png)

به همین ترتیب، اسناد مربوط به هر بسته جنگو که در  [readthedocs.org](http://readthedocs.org)  میزبانی شده است را نیز می توان به نسخه های قبلی آن ریشه‌یابی کرد.

به عنوان مثال، می توانید با کلیک بر روی انتخابگر در قسمت پایین سمت چپ صفحه، مستندات `django-braces` را تا نسخه 1.0.0 انتخاب کنید:


![image 02](2.png)

## ایجاد تصویر کلی

بیشتر مردم با مشاهده نمودار سطح بالا از یک برنامه کاربردی راحت تر آن را درک می کنند. در حالی که این به طور ایده‌آل توسط شخصی ایجاد می‌شود که عملکرد برنامه را می‌فهمد، ابزارهایی وجود دارند که می‌توانند تصاویر بسیار مفیدی در سطح بالا از یک برنامه جنگو ایجاد کنند.

با دستور مدیریت `graph_models` که توسط بسته `django-command-extensions` ارائه می شود، می توان یک نمای کلی گرافیکی از همه مدل ها در برنامه های شما ایجاد کرد. همانطور که در نمودار زیر نشان داده شده است، کلاس های مدل و روابط آنها را می توان در یک نگاه درک کرد:

![image 03](3.png)

این تجسم در واقع با استفاده از PyGraphviz ایجاد می شود. این می تواند برای پروژه های حتی با پیچیدگی متوسط واقعاً بزرگ باشد. از این رو، اگر برنامه ها به طور منطقی گروه بندی شده و جداگانه تجسم شوند، ممکن است آسان تر باشد.


## نصب و استفاده از PyGraphviz

اگر فکر مکنید که نصب PyGraphviz چالش برانگیز است، نگران نباشید، شما تنها نیستید. اخیراً هنگام نصب در اوبونتو با مشکلات متعددی مواجه شدم، از ناسازگاری پایتون 3 تا اسناد ناقص. برای صرفه جویی در وقت شما، مراحلی را که برای رسیدن به یک راه‌اندازی صحیح نیاز است، لیست کرده‌ام:

1.	در اوبونتو، برای نصب PyGraphviz به بسته های زیر نیاز دارید:
PyGraphviz:

```bash
$ sudo apt-get install python-dev graphviz libgraphviz-dev pkg-config
```

2.	اکنون محیط مجازی خود را فعال کنید و pip را اجرا کنید تا نسخه توسعه PyGraphviz را مستقیماً از GitHub که از Python 3 پشتیبانی می کند نصب کنید:

```bash
$ pip install
git+http://github.com/pygraphviz/pygraphviz.git#egg=pygraphviz
```

3.	سپس،`django-extensions` را نصب کنید و آن را به `INSTALLED_APPS` خود اضافه کنید. اکنون، شما آماده اید.

4.	در اینجا نمونه ای وجود دارد که برای ایجاد یک فایل GraphViz با پسوند dot فقط برای دو برنامه و تبدیل آن به یک تصویر با پسوند PNG برای مشاهده استفاده می شود:

```bash
$ python manage.py graph_models app1 app2 > models.dot
$ dot -Tpng models.dot -o models.png
```

## تغییرات افزایشی یا نوشتن مجدد به صورت کامل؟

اغلب، کدهای قدیمی توسط صاحبان برنامه به شما تحویل داده می شود به این امید که بیشتر آن می تواند فوراً یا پس از چند تغییر جزئی استفاده شود. با این حال، خواندن و درک یک پایگاه کد عظیم و اغلب قدیمی کار آسانی نیست. جای تعجب نیست که بیشتر برنامه نویسان کار روی greenfield  را ترجیح می دهند.

در بهترین حالت، کد قدیمی باید به راحتی قابل آزمایش، به خوبی مستند و انعطاف پذیر باشد تا در محیط های مدرن کار کند تا بتوانید در کمترین زمان تغییرات تدریجی را شروع کنید. در بدترین حالت، ممکن است توصیه کنید کد موجود را دور بیندازید و به بازنویسی کامل بروید. روش دیگر، همانطور که در بیشتر موارد وجود دارد، رویکرد کوتاه‌مدت ادامه ایجاد تغییرات تدریجی است و ممکن است یک تلاش بلندمدت موازی برای اجرای مجدد کامل انجام شود.

یک قانون کلی که هنگام اتخاذ چنین تصمیماتی باید رعایت شود این است که اگر هزینه بازنویسی برنامه و نگهداری برنامه کمتر از هزینه نگهداری برنامه قدیمی در طول زمان است، توصیه می شود به سراغ بازنویسی بروید. باید مراقب تمام عوامل، مانند زمان صرف شده برای به روز رسانی برنامه نویسان جدید، و هزینه نگهداری سخت افزار قدیمی باشید.

گاهی اوقات، پیچیدگی حوزه برنامه به مانع بزرگی در برابر بازنویسی تبدیل می شود، زیرا بسیاری از دانش‌های آموخته شده در فرآیند ساخت کدهای قدیمی از بین می رود. اغلب، این وابستگی به کد قدیمی خود نشانه ای از طراحی ضعیف در برنامه است، مانند شکست در برون‌سپاری قوانین تجاری از منطق برنامه.

بدترین شکل بازنویسی که احتمالاً می توانید انجام دهید تبدیل یا ترجمه مکانیکی از یک زبان به زبان دیگر بدون استفاده از بهترین شیوه های موجود است. به عبارت دیگر، شما فرصت مدرن سازی پایه کد را با حذف سال‌ها شکست از دست دادید.

کد باید به عنوان یک بدهی و نه به عنوان یک دارایی در نظر گرفته شود. هرچقدر هم که ممکن است غیر شهودی به نظر برسد، اگر بتوانید با مقدار کمتری کد به اهداف تجاری خود برسید، بهره وری خود را به طرز چشمگیری افزایش داده اید. داشتن کد کمتر برای آزمایش، اشکال زدایی و نگهداری نه تنها می تواند هزینه های جاری را کاهش دهد، بلکه سازمان شما را در برابر تغییرات چابک تر و انعطاف پذیرتر می کند.

`کد یک بدهی است، نه یک دارایی. کد کمتر قابل نگهداری است.`

صرف نظر از اینکه ویژگی‌ها را اضافه می‌کنید یا کد خود را مرتب می‌کنید، شما نباید بدون انجام آزمایشات به کد قدیمی کاری خود دست بزنید

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



