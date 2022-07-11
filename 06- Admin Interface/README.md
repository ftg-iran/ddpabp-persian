# **6 Admin Interface**

In this chapter, we will discuss the following topics:

- Customizing admin
- Enhancing models for the admin
- admin best practices
- Feature flags

Django's prominent feature is the admin interface, which makes it stand out from the competition. It is a built-in app that automatically generates a user interface to add and modify a site's content. For many, the admin is Django's killer app, automating the boring task of creating admin interfaces for the models in your project.

The admin enables your team to add content and continue development at the same time. Once your models are ready and migrations have been applied, you just need to add a line or two to create its admin interface. Let's see how.

**Using the admin interface**

In a newly generated project, the admin interface is enabled by default. After starting your development server, you will be able to see a login page when you navigate to http://127.0.0.1:8000/admin/.

If you have configured a superuser's credentials (or the credentials of any staff user), then you could log into the admin interface, as shown in the following screenshot:

![](/06-%20Admin%20Interface/images/image-000.png)

Screenshot of Django administration in a new project

If you have used Django before, you'll notice that the appearance of the admin interface has improved, especially the SVG icons on high-DPI screens. It also uses responsive design, which works across all major mobile browsers.

However, your models will not be visible here, unless you register the model with the admin site. This is defined in your app's admin.py. For instance, in sightings/admin.py, we register the Sighting model, as follows:

```python
from django.contrib import admin from . import models

admin.site.register(models.Sighting)
```

The first argument to register specifies the model class to be added to the admin site. Here, the second argument to register, a ModelAdmin class, has been omitted, hence we will get a default admin interface for the post model. Let's see how to create and customize this ModelAdmin class.

**The Beacon**

"Having coffee?" asked a voice from the corner of the pantry. Sue almost spilled her coffee. A tall man wearing a tight red and blue colored costume stood to smile with hands on his hips. The logo emblazoned on his chest said, in large type, Captain Obvious.

"Oh, my God," said Sue as she wiped at the coffee stain with a napkin.

"Sorry, I think I scared you," said Captain Obvious "What is the emergency?"

"Isn't it obvious that she doesn't know?" said a calm female voice from above. Sue looked up to find a shadowy figure slowly descend from the open hall. Her face was partially obscured by her dark matted hair, which had a few grey streaks.

"Hi Hexa!" said the Captain "But then, what was the message on SuperBook about?"

Soon, they were all at Steve's office staring at his screen.

"See, I told you there is no beacon on the front page," said Evan. "We are still developing that feature."

"Wait," said Steve. "Let me log in through a nonstaff account."

In a few seconds, the page refreshed and an animated red beacon appeared at the top, prominently positioned.

"That's the beacon I was talking about!" exclaimed Captain Obvious.

"Hang on a minute," said Steve. He pulled up the source files for the new features deployed earlier that day. A glance at the beacon feature branch code made it clear what went wrong:

```python
if switch_is_active(request, 'beacon') and not request.user.is_staff():
    beacon.activate()
```

"Sorry everyone," said Steve. "There has been a logic error. Instead of turning this feature on only for staff, we inadvertently turned it on for everyone but staff. It is turned off now. Apologies for any confusion."

"So, there was no emergency?" asked Captain with a disappointed look. Hexa put an arm on his shoulder and said "I am afraid not, Captain." Suddenly, there was a loud crash, and everyone ran to the hallway. A man had apparently landed in the office through one of the floor-to- ceiling glass walls. Shaking off shards of broken glass, he stood up. "Sorry, I came as fast as I could," he said. "Am I late to the party?"

Hexa laughed. "No, Blitz. Been waiting for you to join," she said.

**Enhancing models for the admin**

Here is an example that enhances the model's admin for better presentation and functionality. You can look at the difference between the two following screenshots to see how a few lines of code can make a lot of difference:

![](/06-%20Admin%20Interface/images/image-001.png)

The default admin list view for the sightings model

After the admin customizations explained in this section are made, the same information will be presented in a much more accessible manner, as shown in the following screenshot:

![](/06-%20Admin%20Interface/images/image-002.png)

The improved admin list view for the sightings model

The admin app is smart enough to figure out a lot of things from your model automatically. However, sometimes the inferred information can be improved. This usually involves adding an attribute or a method to the model itself (rather than to the ModelAdmin class).

Here is the enhanced Sightings model:

```python
\# models.py
class Sighting(models.Model):
    superhero = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    power = models.CharField(max_length=100)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    sighted_on = models.DateTimeField()

    def __str__(self):
        return "{}'s power {} sighted at: {} on {}".format(
            self.superhero,
            self.power,
            self.location.country,
            self.sighted_on)

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('sighting_details', kwargs={'pk': self.id})

    class Meta:
      unique_together = ("superhero", "power")
      ordering = ["-sighted_on"]
      verbose_name = "Sighting & Encounter"
      verbose_name_plural = "Sightings & Encounters"
```

Let's take a look at how admin uses all these nonfield attributes:

**_\_\_str\_\_()_**: Without this, the list of superhero entries would look extremely boring. All entries would be shown alike, with the format of < Sighting:
Sighting object>. Try to display the object's unique information in its str representation (or Unicode representation, in the case of Python 2.x code), such as its name or version. Anything that helps the admin to recognize the object unambiguously would help.

**_get_absolute_url()_**: This method is handy if you like to switch between the

admin site and the object's corresponding detail view on your (nonadmin) website. If this method is defined, then a button labeled **View on site** will appear in the top right-hand corner of the object's **Edit** page within the admin.

- **_ordering_**: Without this Meta option, your entries can appear in any order as returned from the database. As you can imagine, this is no fun for the admins if you have a large number of objects. The admins usually prefer to see fresh entries first, so sorting by date in the reverse chronological order (hence the minus sign) is common.
- **_verbose_name_**: If you omit this attribute, your model's name would be converted from CamelCase into camel case. In this case, it used frivolously to change "Sighting" to "Sighting & Encounter". But sometimes, the automatically generated verbose_name looks awkward, and you can specify how you would like the user-readable name to appear in the admin interface here.
- **_verbose_name_plural_**: Again, omitting this option can leave you with funny results. Since Django simply prepends an _s_ to the word, the generated plural would be shown as "Sighting & Encounters" (on the admin front page, no less), so it is better to define it correctly here.

It is recommended that you define the previous Meta attributes and methods not just for the admin interface, but for better representation in the shell, log files, and so on. However, you can use many more features of the admin by creating a custom ModelAdmin class. In this case, we customize it as follows:

class. In this case, we customize it as follows:
\# admin.py

```python
class SightingAdmin(admin.ModelAdmin):
    list_display = ('superhero', 'power', 'location', 'sighted_on')
    date_hierarchy = 'sighted_on'
    search_fields = ['superhero']
    ordering = ['superhero']
admin.site.register(models.Sighting, SightingAdmin)
```

Let's take a look at these options more closely:
list_display: This option shows the model instances

Let's take a look at these options more closely:

- **_list_display_**: This option shows the model instances in a tabular form. Instead of using the model's \_\_str\_\_ representation, it shows each field mentioned as a separate sortable column. This is ideal if you like to sort by more than one attribute of your model.
- **_date_hierarchy_**: Specifying any date-time field of the model as a date hierarchy will present a date drill down (note the clickable years below the **Search** box).
- **_search_fields_**: This option shows a **Search** box above the list. Any search term entered would be searched against the mentioned fields. Hence, only text fields such as CharField or TextField can be mentioned here.
- **_ordering_**: This option takes precedence over your model's default ordering. It is useful if you prefer a different ordering in your admin screen, which is the preference we have adopted here.

We have only mentioned a subset of the most commonly used admin options. Certain kinds of sites use the admin interface heavily. In such cases, it is highly recommended that you go through and understand the admin part of the Django documentation.

**Not everyone should be an admin**

Since admin interfaces are so easy to create, people tend to misuse them. Some give users administration access indiscriminately by merely turning on their staff flag. Soon, users begin making feature requests, mistaking the admin interface for the actual application interface.

Unfortunately, this is not what the admin interface is for. As the word staff suggests, it is an internal tool for the staff to enter content. It is production-ready, but not really intended for the end users of your website.

It is best to use admin for simple data entry. For example, in a school-wide intranet project I once reviewed, every teacher was made an admin for a Django application. This was a poor decision since the admin interface confused the teachers.

The workflow for scheduling a class involves checking the schedules of other teachers and students. Using the admin interface gives them a direct view of the database. There is very little control over how the data gets modified by the administrator.

So, keep the set of people with admin access as small as possible. Make changes via admin sparingly, unless it is simple data entry, such as adding an article's content.

**Best Practice**

Don't give admin access to end users.

Ensure that all your admins understand the data inconsistencies that can arise from making changes through the admin. If possible, record manually, or use apps, such as [django-](http://django-auditlog.readthedocs.io/en/latest/)

[audit-log, that](http://django-auditlog.readthedocs.io/en/latest/) can keep a log of admin changes made for future reference.

In the case of the university example, we created a separate interface for teachers, such as a course scheduler. These tools contain application code that can be used for purposes that are far beyond admin's data entry functionality, such as the detection of date conflicts.

Essentially, rectifying most misuses of the admin interface involve creating more powerful tools for certain sets of users. However, don't take the easy (and wrong) path of granting them admin access.

**Admin interface customizations**

The out-of-the-box admin interface is quite useful when getting started. Unfortunately, most people assume that it is quite hard to change the Django admin and leave it as it is. In fact, the admin is extremely customizable, and its appearance can be drastically changed with minimal effort.

**Changing the heading**

Many users of the admin interface might be stumped by the heading—Django administration. It might be more helpful to change this to something customized, such as _MySite Admin_, or something cool, such as _SuperBook Secret Area_.

It is quite easy to make this change. Simply add the following line to your site's urls.py:

```python

admin.site.site_header = "SuperBook Secret Area"

```

**Changing the base and stylesheets**

Almost every admin page is extended from a common base template

named admin/base_site.html. This means that with a little knowledge of HTML and CSS, you can make all sorts of customizations to change the look and feel of the admin interface.

Create a directory called admin in any templates directory. Then, copy the

base_site.html file from the Django source directory and alter it according to your

needs. If you don't know where the templates are located, just run the following commands within the Django shell:

**>>> from os.path import join**

**>>> from django.contrib import admin**

**>>> print(join(admin.\_\_path\_\_[0], "templates", "admin")) /home/arun/env/sbenv/lib/python3.6/site- packages/django/contrib/admin/templates/admin**

The last line is the location of all your admin templates. You can override or extend any of these templates.

For an example of overriding the admin base template, you can change the font of the entire admin interface to _Special Elite_ from Google Fonts, which is great for giving a mock-serious look.

You will need to copy base_site.html from the admin templates to admin/base_site.html in one of your template's directories. Then, add the following lines to the end:

```html
{% block extrastyle %}

<link
  href="http://fonts.googleapis.com/css?family=Special+Elite"
  rel="stylesheet"
  type="text/css"
/>

<style type="text/css">
  body,
  td,
  th,
  input {
    font-family: "Special Elite", cursive;
  }
</style>
{% endblock %}
```

This adds an extra stylesheet for overriding the font-related styles and will be applied to every admin page.

**Adding a rich-text editor for WYSIWYG editing**

Sometimes, you will need to include JavaScript code in the admin interface. A common requirement is to use an HTML editor, such as CKEditor, for your TextField.

There are several ways to implement this in Django, for example, using a Media inner class on your ModelAdmin class. However, I find extending the admin change_form template to be the most convenient approach.

For example, if you have an app called posts, then you will need to create a file called change_form.html within the templates/admin/posts/ directory. If you need to show CKEditor (it could be any JavaScript editor, but this one is the one I prefer) for the message field of a model in this app, then the contents of the file can be as follows:

```html
{% extends "admin/change\_form.html" %} {% block footer %} {{ block.super }}

<script src="//cdn.ckeditor.com/4.4.4/standard/ckeditor.js"></script>
<script>
  CKEDITOR.replace("**id_message**", {
    toolbar: [["Bold", "Italic", "-", "NumberedList", "BulletedList"]],
    width: 600,
  });
</script>
<style type="text/css">
  .cke {
    clear: both;
  }
</style>

{% endblock %}
```

The part in bold is the automatically created ID for the form element we wish to enhance from a normal textbox to a rich-text editor. This change will not affect other textboxes or form fields in the admin site. These scripts and styles have been added to the footer block so that the form elements are created in the DOM before they are changed.

Other approaches for achieving this might require the installation of apps and other configuration changes. For changing just one admin site field, this might be overkill. The approach here also gives you the flexibility to pick and choose the JavaScript editor of your choice.

**Bootstrap-themed admin**

Unsurprisingly, a common request for admin customization is whether it can be integrated with Bootstrap. There are several packages that can do this, such as Django-admin- bootstrapped or Django suit.

Rather than overriding all the admin templates yourself, these packages provide ready-to- use Bootstrap-themed templates. They are easy to install and deploy. Being based on Bootstrap, they are responsive and come with a variety of widgets and components.

**Complete overhauls**

Attempts have been made to completely reimagine the admin interface. [Grappelli is a ](https://django-grappelli.readthedocs.io/)very popular skin that extends the Django admin with new features, such as autocomplete lookups and collapsible inlines. With [django-admin-tools, you ](https://django-admin-tools.readthedocs.io/)get a customizable dashboard and menu bar.

Attempts have also been made to completely rewrite the admin, such as django-admin2 and nexus, which did not achieve any significant adoption. There is even an official proposal called AdminNext to revamp the entire admin app. Considering the size, complexity, and popularity of the existing admin, any such effort is expected to take a significant amount of time.

**Protecting the admin**

The admin interface of your site provides access to almost every piece of data stored, so don't leave the metaphorical gate lightly guarded. In fact, one of the only telltale signs that someone is running Django is that when you navigate to [http://example.com/admin/, you](http://example.com/admin/)

will be greeted by the blue login screen.

In production, it is recommended that you change this location to something less obvious. It is as simple as changing the following line in your root urls.py:

```python
path('secretarea/', admin.site.urls),
```

A slightly more sophisticated approach is to use a dummy admin site at the default location or a honeypot (see the [django-admin-honeypot package).](http://django-admin-honeypot.readthedocs.io/) However, the best option is to use HTTPS for your admin area (and everywhere else) since normal HTTP will send all the data in plain-text over the network.

Check your web server documentation on how to set up HTTPS for admin requests (or, even better, if your entire site can be on HTTPS). On Nginx, it is quite easy to set this up. This involves specifying the SSL certificate locations. Finally, redirect all HTTP requests for admin pages to HTTPS, and you can sleep more peacefully.

The following pattern is not strictly limited to the admin interface but it is nonetheless included in this chapter, as it is often controlled in the admin.

**Pattern – feature flags**

**Problem:** The publishing of new features to users should be independent of the deployment of the corresponding code in production.

**Solution:** Use feature flags to selectively enable or disable features after deployment.

**Problem details**

Rolling out frequent bug fixes and new features to production is common today. Many of these changes are unnoticed by users. However, new features that have a significant impact in terms of usability or performance ought to be rolled out in a phased manner. In other words, deployment should be decoupled from a release.

Simplistic release processes activate new features as soon as they are deployed. This can potentially have catastrophic results, ranging from user issues (swamping your support resources) to performance issues (causing downtime).

Hence, in large sites, it is important to decouple deployment of new features in production and their activation. Even if they are activated, they are sometimes only seen by a select group of users. This select group can be staff or a limited set of customers who get an early preview.

**Solution details**

Many sites control the activation of new features using feature flags. Typically, this is a switch controlled in each environment. A feature flipper is a switch in your code that determines whether a feature should be made available to certain customers. But we shall use the general term feature flags here.

Several Django packages provide feature flags, such as [gargoyle and](http://gargoyle.readthedocs.io/) [django-waffle. These ](https://waffle.readthedocs.io/)packages store feature flags of a site in the database. They can be activated or deactivated through the admin interface or through management commands. Hence, every environment (production, testing, development, and so on) can have its own set of activated features.

Feature flags were originally documented in Flickr (see [http://code.flickr.net/2009/12/02/flipping-out/). They managed a ](http://code.flickr.net/2009/12/02/flipping-out/)code repository without any branches—that is, everything was checked into the mainline. They also deployed this code into production several times a day. If they found out that a new feature broke anything in production or increased load on the database, then they simply disabled it by turning that feature flag off.

Feature flags can be used for various other situations (the following examples use Django Waffle):

**Trials**: A feature flag can also be conditionally active for certain users. These can be your own staff or certain early adopters that you may be targeting, as follows:

```python
def my_view(request):
    if flag_is_active(request, 'flag_name'):
    \#Behavior if flag is active.
```

Sites can run several such trials in parallel, so different sets of users might actually have different user experiences. Metrics and feedback are collected from these controlled tests before wider deployment.

**A/B testing**: This is quite similar to trials, except that users are selected randomly within a controlled experiment. This method is quite common in web design and is used to identify which changes can increase the conversion rates. The following is how such a view can be written:

```python
def my_view(request):
    if sample_is_active(request, 'new_design'):
    \#Behavior for test sample.
```

- **Performance testing**: Sometimes, it is hard to measure the impact of a feature on server performance. In such cases, it is best to activate the flag only for a small percentage of users first. The percentage of activation can be gradually increased if the performance is within the expected limits.
- **Limit externalities**: We can also use feature flags as a site-wide feature switch that reflects the availability of its services. For example, downtime in external services such as Amazon S3 can result in users facing error messages while they perform actions such as uploading photos. When the external service is down for extended periods, a feature flag can be deactivated and would disable the **Upload** button and/or show a more helpful message about the downtime. This simple feature saves the user's time and provides a better user experience:

```python
def my_view(request):
    if switch_is_active('s3_down'):
    \#Disable uploads and show it is downtime

```

The main disadvantage of this approach is that the code gets littered with conditional checks. However, this can be controlled by periodic code cleanups that remove checks for fully accepted features and prune out permanently deactivated features.

The activation of flags can be controlled from the admin site using the built-in user authentication and permissions systems. You can also control the sample percentage from the admin interface.

**Summary**

In this chapter, we explored Django's built-in admin app. We found that it is not only quite useful out of the box, but that various customizations can also be made to improve its appearance and functionality.

In the next chapter, we will take a look at how to use forms more effectively in Django by considering various patterns and common use cases.
