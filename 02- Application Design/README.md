**Application Design**

In this chapter, we will cover the following topics:

- Gathering requirements
- Creating a concept document
- HTML mockups
- How to divide a project into apps
- Whether to write a new app or reuse an existing one
- Best practices before starting a project
- Why Python 3?
- Which Django version to use
- Starting the SuperBook project

Many novice developers approach a new project by beginning to write code right away. More often than not, it leads to incorrect assumptions, unused features, and lost time. Spending some time with your client in understanding core requirements, even in a project short on time, can yield incredible results. Managing requirements is a key skill worth learning.

**How to gather requirements?**

_"Innovation is not about saying yes to everything. It's about saying NO to all but the most crucial features."_

_– Steve Jobs_

I have saved several doomed projects by spending a few days with the client to carefully listen to their needs and set the right expectations. Armed with nothing but a pencil and paper (or their digital equivalents), the process is incredibly simple, but effective. Here are some of the key points to remember while gathering requirements:

1. Talk directly to the application owners even if they are not technically minded.
1. Make sure you listen to their needs fully and note them.
1. Don't use technical jargon such as _models_. Keep it simple and use end- user friendly terms such as a _user profile_.
1. Set the right expectations. If something is not technically feasible or difficult, make sure you tell them right away.
1. Sketch as much as possible. Humans are visual in nature. Websites more so. Use rough lines and stick figures. No need to be perfect.
1. Break down process flows such as user signup. Any multistep functionality needs to be drawn as boxes connected by arrows.
1. Next, work through the features list in the form of user stories or in any easily readable form.
1. Play an active role in prioritizing the features into high, medium, or low buckets.
1. Be very, very conservative in accepting new features.
1. Post-meeting, share your notes with everyone to avoid misinterpretations.

The first meeting will be long (perhaps a day-long workshop or a couple of hour-long meetings). Later, when these meetings become frequent, you can trim them down to 30 minutes or one hour.

The output of all this would be a one-page write-up and a couple of poorly drawn sketches. Some also make a _wireframe_, which shows the skeletal structure of the site.

In this book, we have taken upon ourselves the noble project of building a social network called SuperBook for superheroes. A simple wireframe based on our discussions with a bunch of randomly selected superheroes is shown here:

![](/02-%20Application%20Design/images/0.jpg) *A wireframe of the SuperBook website in responsive design – Desktop (left) and mobile (right) layouts*

**Are you a storyteller?**

So what is this one-page write-up? It is a simple document that explains how it feels to use the site. In almost all the projects I have worked with, when someone new joins the team, they will be quickly discouraged if asked to go through every bit of paperwork. But they will be thrilled if they find a single-page document that quickly tells them what the site is meant to be.

You can call this document whatever you like—concept document, market requirements document, customer experience documentation, or even an Epic Fragile StoryLog™ (patent pending). It really doesn't matter.

The document should focus on the user experience rather than technical or implementation details. Make it short and interesting to read. In fact, Joel Spolsky's rule number one on documenting requirements is _funny_.

If possible, write about a typical user (persona in marketing speak), the problem they are facing, and how the web application solves it. Imagine how they would explain the experience to a friend. Try to capture this.

Here is a concept document for the SuperBook project:

**_The SuperBook concept_**

_The following interview was conducted after our website SuperBook was launched in the future. A 30-minute user test was conducted just prior to the interview._

**_Please introduce yourself._**

_My name is Aksel. I am a gray squirrel living in downtown New York. However, everyone calls me Acorn. My dad, T. Berry, a famous hip-hop star, used to call me that. I guess I was never good enough at singing to take up the family business. Actually, in my early days, I was a bit of a kleptomaniac. I am allergic to nuts, you know. Other bros have it easy. They can just live off any park. I had to improvise—cafes, movie halls, amusement parks, and so on. I read labels very carefully too._

***Ok, Acorn. Why do you think you were chosen for the user testing?*** Probably, because I was featured in an NY Star special on lesser-known superheroes. I guess people find it amusing that a squirrel can use a MacBook (Interviewer: this interview was conducted over chat). Plus, I have the attention span of a squirrel.*

![](/02-%20Application%20Design/images/1.png) ***Based on what you saw, what is your opinion of SuperBook?***

_I think it is a fantastic idea. I mean, people see superheroes all the time. However, nobody cares about them. Most are lonely and antisocial. SuperBook could change that._

**_What do you think is different about SuperBook?_**

_It is built from the ground up for people like us. I mean, there is no fill your "Work and Education" nonsense when you want to use your secret identity. Though I don't have one, I can understand why one would._

**_Could you tell us briefly some of the features you noticed?_**

_Sure, I think this is a pretty decent social network, where you can:_

- _Sign up with any username (no more, "enter your real name", silliness)_
- _Fans can follow people without having to add them as "friends"_
- _Make posts, comment on them, and re-share them_
- _Send a private post to another user_

\*Everything is easy. It doesn't take a superhuman to figure it out. **Thanks for your time, Acorn.\***

**HTML mockups**

In the early days of building web applications, tools such as Photoshop and Flash were used extensively to get pixel-perfect mockups. They are hardly recommended or used anymore.

Giving a native and consistent experience across mobiles, tablets, laptops, and other platforms is now considered more important than getting that pixel-perfect look. In fact, most web designers directly create layouts on HTML.

Creating an HTML mockup is a lot faster and easier than ever before. If your web designer is unavailable, developers can use a CSS framework such as Bootstrap or ZURB Foundation framework to create pretty decent mockups.

The goal of creating a mockup is to create a realistic preview of the website. It should not merely focus on details and polish to look closer to the final product compared to a sketch, but add interactivity as well. Make your static HTML come to life with working links and some simple JavaScript- driven interactivity.

A good mockup can give 80 percent of customer experience with less than 10 percent of the overall development effort.

**Designing the application**

When you have a fairly good idea of what you need to build, you can start thinking about the implementation in Django. Once again, it is tempting to start coding away. However, when you spend a few minutes thinking about the design, you can find plenty of different ways to solve a design problem.

You can also start designing tests first, as advocated in the **Test-driven Development** (**TDD**) methodology. We will see more of the TDD approach in : _Testing and Debugging_.

Chapter 11

Whichever approach you take, it is best to stop and think:

- What are the different ways in which I can implement this?
- What are the trade-offs?
- Which factors are more important in our context?
- Finally, which approach is the best?

The best designs are often elegant and harmonious as a whole. This is usually where design patterns can help you. Well-designed code is not only easier to read, but also faster to extend and enhance.

Experienced Django developers look at the overall project in different ways. Sticking to the DRY principle (or sometimes because they get lazy), they think, have I seen this functionality before? For instance, can this social login feature be implemented using a third-party package such as django-all-auth?

If they have to write the app themselves, they start thinking of various design patterns in the hope of an elegant design. However, they first need to break down a project at the top-level into apps.

**Dividing a project into apps**

Django applications are called **projects**. A project is made up of several applications or apps. An app is a Python package that provides a set of features for a common purpose such as authentication or thumbnails.

Ideally, each app must be reusable and loosely coupled to others. You can create as many apps as you need. Never be afraid to add more apps or refactor the existing ones into multiple apps. A typical Django project contains 15-20 apps.

An important decision to make at this stage is whether to use a third-party Django app or build one from scratch. Third-party apps are ready-to-use apps, which are not built by you. Most packages are quick to install and set up. You can start using them in a few minutes.

On the other hand, writing your own app often means designing and implementing the models, views, test cases, and so on yourself. Django will make no distinction between apps of either kind.

**Reuse or roll-your-own?**

One of Django's biggest strengths is the huge ecosystem of third-party apps. At the time of writing, [ ](http://djangopackages.com/)lists more than 3,500 packages. You

[djangopackages.com](http://djangopackages.com/)

might find that your company or personal library has even more. Once your project is broken into apps and you know which kind of apps you need, you will need to take a call for each app—whether to write or reuse an existing one.

It might sound easier to install and use a readily available app. However, it not as simple as it sounds. Let's take a look at some third-party authentication apps for our project, and list the reasons why we didn't use them for SuperBook at the time of writing:

**Over-engineered for our needs**: We felt that [ ](https://github.com/python-social-auth/social-app-django)with

[python-social-auth](https://github.com/python-social-auth/social-app-django)![](gd2nxz3p.003.png)

support for any social login was unnecessary

- **Too specific**: Using [Django-Facebook would](http://django-facebook.readthedocs.io/en/latest/installation.html) mean tying our authentication to that provided by a specific website
- **Might break other apps**: Some apps can cause unintentional side effects in other apps
- **Python dependencies**: Some apps have dependencies that are not actively maintained or unapproved
- **Non-Python dependencies**: Some packages might have non-Python dependencies, such as Redis or Node.js, which have deployment overheads
- **Not reusable**: Many of our own apps were not used because they were not very easy to reuse or were not written to be reusable

None of these packages are bad. They just don't meet our needs for now. They might be useful for a different project. In our case, the built-in Django auth app was good enough.

On the other hand, you might prefer to use a third-party app for some of the following reasons:

- **DRY**: Do not reinvent the wheel. Take advantage of open source and well-tested apps that might be better than what you write from scratch.
- **Too hard to get right**: Do your model's instances need to form a tree, but also be (relational) database-efficient? Use .

django-mptt

- **Best or recommended app for the job**: This changes over time, but packages such as django-debug-toolbar are the most recommended for their use case.
- **Missing batteries**: Many feel that packages such as django-model-utils

and should have been part of the framework.

django-extensions

- **Minimal dependencies**: This is always good in my book. Fewer apps means fewer unintended interactions between apps to worry about.

So, should you reuse apps and save time or write a new custom app? I would recommend that you try a third-party app in a sandbox. If you are an intermediate Django developer, then the next section will tell you how to try packages in a sandbox.

**My app sandbox**

From time to time, you will come across several blog posts listing the must- have Django packages. However, the best way to decide whether a package is appropriate for your project is **prototyping**.

Even if you have created a Python virtual environment for development, trying all these packages and later discarding them can litter your environment. So, I usually end up creating a separate virtual environment named _sandbox_ purely for trying such apps. Then, I build a small project to understand how easy it is to use.

Later, if I am happy with my test drive of the app, I create a branch in my project using a version control tool such as Git to integrate the app. Then, I continue with coding and running tests in the branch until the necessary features are added. Finally, this branch will be reviewed and merged back to the mainline (sometimes called master) branch.

**Which packages made it?**

To illustrate the process, our SuperBook project can be roughly broken down into the following apps (not the complete list):

- **Authentication** (built-in django.auth): This app handles user signups, login, and logout
- **Accounts** (custom): This app provides additional user profile information
- **Posts** (custom): This app provides posts and comments functionality

Here, an app has been marked to be built from scratch (tagged custom) or the third-party Django app that we would be using. As the project progresses, these choices might change. However, this is good enough for a start.

**Best practices before starting a project**

While preparing a development environment, make sure that you have the following in place:

- **A fresh Python virtual environment**: Python 3 includes the venv module or you can install virtualenv. Both of them prevent polluting your global Python library. [pipenv is](https://docs.pipenv.org/) the recommended tool (used in this book as well) for higher-level management of virtual environments and dependencies.
- **Version control**: Always use a version control tool such as Git or Mercurial. They are lifesavers. You can also make changes much more confidently and fearlessly.
- **Choose a project template**: Django's default project template is not the only option. Based on your needs, try other templates such as Edge [https://github.com/arocks/edge](https://github.com/pydanny/cookiecutter-django) by yours truly or use Cookiecutter [https://github.com/pydanny/cookiecutter-django](https://github.com/pydanny/cookiecutter-django)).

- **Deployment pipeline**: I usually worry about this a bit later, but having a fast deployment process speeds up development. I prefer Fabric (it has a Python 3 fork called fabric3) or Ansible.

**SuperBook – your mission, should you choose to accept it**

This book believes in a practical and pragmatic approach of demonstrating Django design patterns and the best practices through examples. For consistency, all our examples will be about building a social network project called SuperBook.

SuperBook focuses exclusively on the niche and often neglected market segment of people with exceptional superpowers. You are one of the developers in a team comprised of other developers, web designers, a marketing manager, and a project manager.

The project will be built in the latest version of Python (version 3.6) and Django (version 2.0) at the time of writing. Since the choice of Python 3 can be a contentious topic, it deserves a fuller explanation.

**Why Python 3?**

While the development of Python 3 started in 2006, its first release, Python 3.0, was released on December 3, 2008. The main reasons for a backward incompatible version were: switching to Unicode for all strings, increased use of iterators, cleanup of deprecated features such as old-style classes, and some new syntactic additions such as the nonlocal statement.

The reaction to Python 3 in the Django community was rather mixed. Even though the language changes between version 2 and 3 were small (and over time, reduced), porting the entire Django codebase was a significant migration effort.

On February 13, Django 1.5 became the first version to support Python 3. Core developers have clarified that, in future, Django will only be written for Python 3.

For this book, Python 3 is ideal for the following reasons:

- **Better syntax**: This fixes a lot of ugly syntaxes, such as izip, xrange, and \_\_unicode\_\_, with the cleaner and more straightforward zip, range, and .\_\_str\_\_

- **Sufficient third-party support**: Of the top 200 third-party libraries, more than 90 percent have Python 3 support (see Python 3 Wall of Superpowers).
- **No legacy code**: We are creating a new project, rather than dealing with legacy code that needs to support an older version.
- **Default in modern platforms**: This is already the default Python interpreter in Arch Linux. Ubuntu and Fedora plan to complete the switch in a future release.
- **It is easy**: From a Django development point of view, there are very few changes, and they can all be learned in a few minutes.

The last point is important. Even if you are using Python 2, this book will serve you fine. Read Appendix A to understand the changes. You will need to make only minimal adjustments to backport the example code to Python 2.

**Which Django Version to use**

Django has now standardized on a release schedule with three kinds of releases:

- **Feature release**: These releases will have new features or improvements to existing features. It will happen every eight months and will have 16 months of extended support from release. They have version numbers like A.B (note there's no minor version).
- **Long-Term Support (LTS) release**: These are special kinds of feature releases, which have a longer extended support of three years from the release date. These releases will happen every two years. They have version numbers like A.2 (since every third feature release will be an LTS). LTS releases have few months of overlap to aid in a smoother migration.
- **Patch release**: These releases are bug fixes or security patches. It is recommended to deploy them as soon as possible. Since they have minimal breaking changes, these upgrades should be painless to apply. They have version numbers like A.B.C

The following Django roadmap visualized should make the release approach clearer:

![](/02-%20Application%20Design/images/2.png)

Django Release Roadmap

![](/images/3.png) _Django 1.11 LTS will be the last release to support Python 2 and it is supported until April 2020. Subsequent versions will only use Python 3._

The right Django version for you will be based on how frequently you can upgrade your Django installation and what features you need. If your project is actively developed and the Django Version can be upgraded at least once in 16 months, then you should install the latest feature release regardless of whether it is LTS or non-LTS.

Otherwise, if your project is only occasionally developed, then you should pick the most recent LTS version. Upgrading your project's Django dependency from one feature release to another can be a non-trivial effort. So, read the release notes and plan accordingly.

This book takes advantage of Django 2.0 features, wherever possible.

**Starting the project**

This section has the installation instructions for the SuperBook project, which contains all the example code used in this book. Do check out the project's on GitHub [ ](https://github.com/DjangoPatternsBook/superbook2)for

README.md <https://github.com/DjangoPatternsBook/superbook2> the latest installation notes. We will be using the pipenv tool to set up the

virtual environment and install all dependencies.

![](gd2nxz3p.006.png) _Create a separate virtual environment for each Django project._

First, clone the example project from GitHub:

![](gd2nxz3p.007.png)**$ git clone https://github.com/DjangoPatternsBook/superbook2.git**

Next, install system-wide or locally, but outside a as

pipenv virtualenv, recommended in pipenv installation documents. Alternatively, follow these

commands:

**$ pip install -U pip $ pip install pipenv![](gd2nxz3p.008.png)**

Now go to the project directory and install the dependencies:

**$ cd superbook2![](gd2nxz3p.008.png)**

**$ pipenv install --dev**

Next, enter the shell to start using your freshly created virtual

pipenv

environment with all the dependencies:

![](gd2nxz3p.009.png)**$ pipenv shell**

Finally, run the project after executing the typical management commands:

**$ cd src![](gd2nxz3p.010.png)**

**$ python manage.py migrate**

**$ python manage.py createsuperuser $ python manage.py runserver**

You can navigate to http://127.0.0.1:8000 or the URL indicated in your Terminal and feel free to play around with the site.

**Summary**

Beginners often underestimate the importance of a good requirements- gathering process. At the same time, it is important not to get bogged down with the details, because programming is inherently an exploratory process. The most successful projects spend the right amount of time preparing and planning before development so that it yields the maximum benefits.

We discussed many aspects of designing an application, such as creating interactive mockups or dividing it into reusable components called apps. We also discussed the steps to set up SuperBook, our example project.

In the next few chapters, we will look at each component of Django in detail and learn the design patterns and best practices around them.
