# 5 Templates

In this chapter, we will discuss the following topics:

- Features of Django's template language
- Jinja2
- Organizing templates
- How templates work
- Bootstrap
- Template inheritance tree pattern
- Active link pattern

It is time to talk about the third musketeer in the MTV trio — templates. Your team might have designers who take care of designing templates, or you might be designing them yourself. Either way, you need to be very familiar with them. They are, after all, directly facing your users.

Django supports several templating languages. Here, we will first look at Django's own templating language, which is configured by default in a new project.

## Understanding Django's template language features

Let's start with a quick primer of **Django Template Language** (**DTL**) features.

**Variables**

Each template gets a set of context variables. Like Python's string format() method's single curly brace {variable} syntax, Django uses the double curly brace {{ variable }} syntax. Let's see how they compare:

In pure Python, the syntax is `<h1>{title}</h1>`. For example:

`>>> "<h1>{title}</h1>".format(title="SuperBook") '<h1>SuperBook</h1>'`

The syntax equivalent in a Django template is `<h1>{{ title }}</h1>` . Rendering with the same context will produce the same output as follows:

`>>> from django.template import Template, Context`

`>>> Template("<h1>{{ title }}</h1>").render(Context({"title": "SuperBook"}))`

`'<h1>SuperBook</h1>'`

**Attributes**

Dot is a multipurpose operator in Django templates. There are three different kinds of operations: attribute lookup, dictionary lookup, or list-index lookup (in that order).

In Python, first, let's define the context variables and classes:

```python
>>> class DrOct:
        arms = 4
        def speak(self):
            return "You have a train to catch."
>>> mydict = {"key":"value"}
>>> mylist = [10, 20, 30]
```

Let's take a look at Python's syntax for the three kinds of lookups:

```python
>>> "Dr. Oct has {0} arms and says: {1}".format(DrOct().arms,
DrOct().speak())
'Dr. Oct has 4 arms and says: You have a train to catch.'
>>> mydict["key"]
'value'
>>> mylist[1]
20
```

In Django's template equivalent, it is as follows:

**Dr. Oct has {{ s.arms }} arms and says: {{ s.speak }} {{ mydict.key }}**

**{{ mylist.1 }}**

Notice how speak, a method that takes no arguments except self, is treated like an attribute here.

**Filters**

Sometimes, variables need to be modified. Essentially, you would like to call functions on these variables. Instead of chaining function calls, such

as var.method1().method2(arg), Django uses the pipe syntax {{ var|method1|method2:"arg" }}, which is similar to Unix filters. However, this syntax only works for built-in or custom-defined filters.

Another limitation is that filters cannot access the template context. They only work with the data passed into them and their arguments. Hence, they are primarily used to alter the variables in the template context.

Run the following command in Python:

```python
**>>> title="SuperBook"**

**>>> title.upper()[:5]**

**'SUPER'**
```

The following is its Django template equivalent:

``{{ title|upper|slice:':5' }}``

**Tags**

Programming languages can do more than just display variables. Django's template language has many familiar syntactic forms, such as if and for. They should be written in the tag syntax such as `{% if %}`. Several template-specific forms, such as include and block, are also written in the tag syntax.

In Python shell:

```shell
>>> if 1==1:
... print(" Date is {0} ".format(time.strftime("%d-%m-%Y")))
Date is 30-05-2018
```

The following is its corresponding Django template form:

`{% if 1 == 1 %} Date is {% now 'd-m-Y' %} {% endif %}`

**Philosophy – don't invent a programming language**

A common question among beginners is how to perform numeric computations such as finding percentages in templates. As a design philosophy, the template system does not intentionally allow the following:

- Assignment to variables
- Function call arguments
- Advanced logic

This decision was made to prevent you from adding business logic in templates. From my experience with PHP or ASP-like languages, mixing logic with presentation can be a maintenance nightmare. However, you can write custom template tags (which will be covered shortly) to perform any computation, especially if it is presentation-related.

**Best Practice**

Keep business logic out of your templates.

Despite this advice, some prefer a slightly more powerful templating engine. In which case, Jinja2 might be what you need.

**Jinja2**

Jinja2 is very similar to DTL in syntax. But it has a slightly different philosophy in certain places. For instance, in DTL the method call is implied as in the following example:

```
{% for post in user.public\_posts %}
...
{% endfor %}
```

But in Jinja2, we invoke the public_posts method similar to a Python function call:

```
{% for post in user.public\_posts() %}
...
{% endfor %}

```

This means that in Jinja2 you can call functions with arguments, unlike DTL. Refer to the [Jinja2 documentation for more](http://jinja2.pocoo.org/) such subtle differences.

Jinja2 is usually chosen for the following reasons:

- **Familiarity**: If your template designers are already comfortable using Jinja2
- **Whitespace control**: Jinja2 has finer control over whitespace after the tags get rendered
- **Customizability**: Most aspects of Jinja2, from string defining markup to extensions, can be easily configured
- **Performance**: Some benchmarks show Jinja2 is faster than Django
- **Autoescape**: By default, Jinja2 disables XML/HTML autoescaping for performance

In most cases, none of these advantages are overwhelming enough to use Jinja2. This also goes for using other templating engines such as Mako or Genshi.

The familiarity of using DTL reduces the learning curve to anyone new to your project. It is also well integrated and tested. Finally, you might have to replicate Django-specific template tags such as static or url.

Unless you have a very good reason not to, I would advise sticking to Django's own template language. The rest of this chapter would be using DTL.

**Organizing templates**

The default project layout created by the startproject command does not define a location for your templates. This is very easy to configure.

Create a directory named templates in your project's root directory. Specify the value for DIRS inside the TEMPLATES variable in your settings.py: (can be found

within superbook/settings/base.py in our superbook project)

```python
BASE\_DIR = os.path.dirname(os.path.dirname(\_\_file\_\_))

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

TEMPLATES = [
{
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
          'context_processors': [
              'django.template.context_processors.debug',
              'django.template.context_processors.request',
              'django.contrib.auth.context_processors.auth',
              'django.contrib.messages.context_processors.messages',
             ],
        },
     },
  ]
```

That's all. For example, you can add a template called about.html and refer to it in the urls.py file as follows:

urlpatterns = [

` path('about/', TemplateView.as_view(template_name='about.html'), name='about'),`

Your templates can also reside within your apps (if APP_DIRS is true). Creating a templates directory inside your app directory is ideal to store your app-specific templates.

Here are some good practices to organize your templates:

![](iixnkps0.002.png) Keep all app-specific templates inside the app's template directory within a separate directory, for example

projroot/app/templates/app/template.html— notice how app appears twice in the path

![](iixnkps0.003.png) Use the .html extension for your templates

![](iixnkps0.004.png) Prefix an underscore for templates, which are snippets to be included, for example: \_navbar.html

The order of specifying template directories matters a lot. To better appreciate that, you need to understand how templates are rendered in Django.

### How templates work ###

Django renders templates while being agnostic of the actual template engine, as the following diagram shows:

![Simplified depiction of template rendering in Django](/05-%20Templates/images/image-000.jpg)

Simplified depiction of template rendering in Django

Each template is rendered by trying each template backend specified by the TEMPLATES variable in settings.py in order.

A **Loader** object corresponding to the backend will search for the template. Based on the backend's configuration, several kinds of loaders will be used. For instance, filesystem.Loader loads templates from the filesystem according to DIRS, and app_directories.Loader loads templates from within app directories.

If a **Loader** is successful, the search ends and that particular backend template engine is chosen for rendering. This results in a **Template** object, which contains the parsed and compiled template.

To render a **Template**, you will need to provide it with a **Context** object. **Context** behaves exactly like a dictionary, but is implemented as a stack of dictionaries. If a **Template** is a container for placeholders, then **Context** provides the values that fill these placeholders.

While using Django **Templates**, you might be more familiar with RequestContext, which

is a subclass of **Context**. A RequestContext adds more context to a template by running template context processors on the request. Jinja2 would not require context processors as it supports calling functions directly.

Finally, the render method of a **Template** object receives the context and renders the output. This might be an HTML, XML, email, CSS, or any textual output.

If you understand the template search order, then you can use it to your advantage to override the loaded templates. The following are some scenarios where this can comein handy:

- Override a third-party apps's template with your own project-defined template
- Use Jinja2 for performance-specific parts of your site and DTL for the rest

The first one is a common use case due to the popularity of CSS frameworks such as Bootstrap.

**Madame O**

For the first time in weeks, Steve's office corner was bustling with frenetic activity. With more recruits, the now five-member team comprised of Brad, Evan, Jacob, Sue, and Steve. Like a superhero team, their abilities were deep and amazingly well-balanced.

Brad and Evan were the coding gurus. While Evan was obsessed over details, Brad was the big-picture guy. Jacob's talent in finding corner cases made him perfect for testing. Sue was in charge of marketing and design.

In fact, the entire design was supposed to be done by an avant-garde design agency. It took them a month to produce an abstract, vivid, color- splashed concept loved by the management. It took them another two weeks to produce an HTML-ready version from their Photoshop mockups. However, it was eventually discarded as it proved to be

sluggish and awkward on mobile devices.

Disappointed by the failure of what was now widely dubbed as the **unicorn vomit** design, Steve felt stuck. Hart had phoned him quite concerned about the lack of any visible progress to show management.

In a grim tone, he reminded Steve, "We have already eaten up the project's buffer time. We cannot afford any last-minute surprises".

It was then that Sue, who had been unusually quiet since she joined, mentioned that she had been working on a mockup using Twitter's Bootstrap. Sue was the growth hacker in the team — a keen coder and a creative marketer.

She admitted having just rudimentary HTML skills. However, her mockup was surprisingly thorough and looked familiar to users of other contemporary social networks. Most importantly, it was responsive and worked perfectly on every device from tablets to mobiles.

The management unanimously agreed on Sue's design, except for someone named Madame O. One Friday afternoon, she stormed into Sue's cabin and began questioning everything from the background color to the size of the mouse cursor. Sue tried to explain to her with surprising poise and calm.

An hour later, when Steve decided to intervene, Madame O was questioning why the profile pictures had to be in a circle rather than a square. "But a site-wide change like that will never get over in time," he said. Madame O shifted her gaze to him and gave him a sly smile. Suddenly, Steve felt a wave of happiness and hope surged within him. It felt immensely relieving and stimulating. He heard himself happily agreeing to all she wanted.

Later, Steve learnt that Madame Optimism was a minor mentalist who could influence prone minds. His team loved to bring up the latter fact on the slightest occasion.

### Using Bootstrap ###

Hardly anyone designs an entire website from scratch these days. CSS frameworks such as Twitter's Bootstrap or Zurb's Foundation are easy starting points with grid systems, great typography, and preset styles. Most of them use responsive web design, making your site mobile friendly.

![A website using modified Bootstrap Version 3.3 built using the Edge project skeleton](/05-%20Templates/images/image-001.png)

A website using modified Bootstrap Version 3.3 built using the Edge project skeleton

We will be using Bootstrap, but the steps will be similar for other CSS frameworks. There are three ways to include Bootstrap in your website:

![](iixnkps0.007.png) **Find a project skeleton**: If you have not yet started your project, then finding a project skeleton that already has Bootstrap is a great option. A project skeleton such as edge (created by yours truly) can be used as the initial structure while running startproject as follows:

`$ django-admin.py startproject -- template=https://github.com/arocks/edge/archive/master.zip -- extension=py,md,html myproj`

Alternatively, you can use one of the cookiecutter templates with support for Bootstrap.

- **Use a package**: The easiest option if you have already started your project is to use a package, such as [django-bootstrap4.](https://github.com/zostera/django-bootstrap4)
- **Manually copy**: None of the preceding options guarantees that their version of Bootstrap is the latest one. Bootstrap releases are so frequent that package authors have a hard time keeping their files up to date. So, if you would like to work with the latest version of Bootstrap, the best option is to download it from [http://getbootstrap.com yourself.](http://getbootstrap.com) Be sure to read the release notes to check whether your templates need to be changed due to backward incompatibility. Copy the dist directory that contains the css, js, and fonts directories into your project root under the static directory. Ensure that this path is set for STATICFILES_DIRS in your settings.py:

`STATICFILES_DIRS = [os.path.join(BASE\_DIR, "static")]`

Now you can include the Bootstrap assets in your templates, as follows:
```html
{% load staticfiles %}
<head>
<link href="{% static 'css/bootstrap.min.css' %}" rel="stylesheet">
```

**But they all look the same!**

Bootstrap might be a great way to get started quickly. However, sometimes, developers get lazy and do not bother to change the default look. This leaves a poor impression on your users who might find your site's appearance a little too familiar and uninteresting.

[Bootstrap 4 comes](https://getbootstrap.com/docs/4.0/) with plenty of options to improve its visual appeal. You can create a

file called custom.scss where you can customize everything from theme colors to grid breakpoints. The documentation explains how you can set up the build system to compile these files down to the style sheets.

Thanks to the huge community around Bootstrap, there are also several sites, such as [bootswatch.com, which](https://bootswatch.com/) have themed style sheets, that are drop-in replacements for your bootstrap.min.css.

Last but least and least, you can make your CSS classes more meaningful by replacing structural class names, such as row or col-lg-9, with semantic tags, such as main or article. You can do this with a few lines of SASS code to @extend the Bootstrap classes, as follows:

```
@import "bootstrap";

body > main { @extend .row;`

article { @extend .col-lg-9; } }
```

This is possible due to a feature called mixins (sounds familiar?). With the SASS source files, Bootstrap can be completely customized to your needs.

**Lightweight alternatives**

Older browsers used to be very inconsistent in how they handled CSS. They not only had vendor-specific prefixes such as -WebKit-transition but also had their own quirks. Newer browsers follow modern standards better.

Now, we also have more powerful layout models such as flexbox, which reduce the complexity of code. All these have resulted in some very lightweight CSS frameworks.

For instance, [Pure.css is ](https://purecss.io/)only 3.8 KB minified and gzipped, but packed with features. Similarly, [mini.css designed](https://minicss.org/) with mobile devices and modern browsers in mind is under 7 KB gzipped. For comparison, Bootstrap is 25 KB, gzipped, with all modules included.

While these lightweight frameworks might save some initial page load time, be sure to test them with all the different browsers your target users might use. Tools such as [CanIUse.com ](https://caniuse.com/)can help by showing which features are supported across browsers and platforms. Bootstrap is quite good at maintaining backward compatibility with the widest range of clients.

**Template patterns**

Django's template language is quite simple. However, you can save a lot of time by following some elegant template design patterns. Let's take a look at some of them.

**Pattern — template inheritance tree**

**Problem**: Templates need lots of common markup in several pages.

**Solution**: Use template inheritance wherever possible and include snippets elsewhere.

**Problem details**

Users expect pages of a website to follow a consistent structure. Certain interface elements, such as navigation menu, headers, and footers are seen in most web applications. However, it is cumbersome to repeat them in every template.

Most templating languages have an include mechanism. The contents of another file, possibly a template, can be included at the position where it is invoked. This can get tedious in a large project.

The sequence of the snippets to be included in every template would be mostly the same. The ordering is important and hard to check for mistakes. Ideally, we should be able to create a base structure. New pages ought to extend this base to specify only the changes or make extensions to the base content.

**Solution details**

Django templates have a powerful extension mechanism. Similar to classes in programming, a template can be extended through inheritance. However, for that to work, the base itself must be structured into blocks as follows:

![](/05-%20Templates/images/image-002.png)

Modular base templates can be extended by individual page templates giving flexibility and consistent layout

The base.html template is, by convention, the base structure for the entire site. This

template will usually be well-formed HTML (that is, with a preamble and matching closing tags) that has several placeholders marked with the {% block tags %} tag. For example,

a minimal base.html file looks as follows:

```html
<html>

<body>

<h1>{% block heading %}Untitled{% endblock %}</h1> {% block content %}

{% endblock %}

</body>

</html>
```

There are two blocks here, heading and content, which can be overridden. You can

extend the base to create specific pages that can override these blocks. For example, here is an About page:
``
```html
{% extends "base.html" %}

{% block content %}

<p> This is a simple About page </p> {% endblock %}

{% block heading %}About{% endblock %}
```

We do not have to repeat the entire structure. We can also mention the blocks in any order. The rendered result will have the right blocks in the right places as defined in base.html.

If the inheriting template does not override a block, then its parent's contents are used. In the preceding example, if the About template does not have a heading, then it will have the default heading of **Untitled**. You can insert the parent's contents explicitly using {{ block.super }}, which can be useful when you want to append or prepend to it.

The inheriting template can be further inherited forming an inheritance chain. This pattern can be used as a common derived base for pages with a certain layout, for example, a single-column layout. A common base template can also be created for a section of the site, for example, Blog pages.

Usually, all inheritance chains can be traced back to a common root, base.html; hence, the pattern's name: _Template inheritance tree_. Of course, this need not be strictly followed. The error pages **404.html** and **500.html** are usually not inherited and are stripped bare of most template tags to prevent further errors.

Another way of achieving this might be to use context processors. You can create a context processor, which will add a context variable that can be used in all your templates globally. But this is not advisable for common markup such as sidebars as it violates the separation of concerns by moving presentation out of the template layer.

**Pattern — the active link**

**Problem**: The navigation bar is a common component in most pages. However, the active link needs to reflect the current page the user is on.

**Solution**: Conditionally, change the active link markup by setting context variables or based on the request path.

**Problem details**

The naïve way to implement the active link in a navigation bar is to manually set it in every page. However, this is neither DRY nor foolproof.

**Solution details**

There are several solutions to determine the active link. Excluding JavaScript-based approaches, they can be mainly grouped into template-only and custom tag-based solutions.

**A template-only solution**

By mentioning an active_link variable while including the snippet of the navigation template, this solution is both simple and easy to implement.

In every template, you will need to include the following line (or inherit it):

{% include "\_navbar.html" with active\_link='link2' %}

The \_navbar.html file contains the navigation menu with a set of checks for the active_link variable:

```html 
{# \_navbar.html #}

<ul class="nav nav-pills">

` `<li{% if active\_link == "link1" %} class="active"{% endif %}><a href="{% url 'link1' %}">Link 1</a></li>

` `<li{% if active\_link == "link2" %} class="active"{% endif %}><a href="{% url 'link2' %}">Link 2</a></li>

` `<li{% if active\_link == "link3" %} class="active"{% endif %}><a href="{% url 'link3' %}">Link 3</a></li>

</ul>
```

**Custom tags**

Django templates offer a versatile set of built-in tags. It is quite easy to create your own custom tag. Since custom tags live inside an app, create a templatetags directory inside an app. This directory must be a package, so it should have an (empty) \_\_init\_\_.py file. Next, write your custom template in an appropriately named Python file. For example, for this active link pattern, we can create a file called nav.py with the following contents:

- app/templatetags/nav.py
```python
from django.core.urlresolvers import resolve from django.template import Library

register = Library()

@register.simple_tag

def active_nav(request, url):
    url_name = resolve(request.path).url_name 
    if url_name == url:
      return "active"
    return ""
```
This file defines a custom tag named active_nav. It retrieves the URL's path component from the request argument (say, /about/: see Chapter 4, _Views and URLs_, for a detailed explanation of the URL path). Then, the resolve() function is used to look up the URL pattern's name (as defined in urls.py) from the path. Finally, it returns the string "active" only when the pattern's name matches the expected pattern name.

The syntax for calling this custom tag in a template is {% active\_nav request 'pattern\_name' %}. Notice that the request needs to be passed in every page that this tag is used.

Including a variable in several views can get cumbersome. Instead, we add a built-in context processor to TEMPLATE_CONTEXT_PROCESSORS in settings.py so that the request will be present in a request variable across the site, as follows:

- settings.py
```
[

'django.core.context_processors.request',

]
```

Now, all that remains is to use this custom tag in your template to set the active attribute:

{# base.html #}

{% load nav %}

```html 
<ul class="nav nav-pills">

<li class={% active\_nav request 'active1' %}><a href="{% url 'active1' %}">Active 1</a></li>

<li class={% active\_nav request 'active2' %}><a href="{% url 'active2' %}">Active 2</a></li>

<li class={% active\_nav request 'active3' %}><a href="{% url 'active3' %}">Active 3</a></li>

</ul>
```

**Summary**

In this chapter, we looked at the features of Django templates. Since it is easy to change the templating language in Django, many people might consider replacing it. However, it is important to learn the design philosophy of the built-in template language before we seek alternatives.

In the next chapter, we will look into one of the killer features of Django, that is, the admin interface, and how we can customize it.
