# Models

In this chapter, we will discuss the following topics:
* The importance of models
* Class diagrams
* Model structural patterns
* Model behavioral patterns
* Migrations

I was once consulted by a data analytics start-up in their early stages. Despite data retrieval being limited to a window of recent data, they had performance issues with page load sometimes taking several seconds. After analyzing their architecture, the problem seemed to be in their data model. However, migrating and transforming petabytes of structured live data seemed impossible.

    Show me your flowcharts and conceal your tables, and I shall continue to be mystified.
    Show me your tables, and I won't usually need your flowcharts; they'll be obvious.
    (Fred Brooks, The Mythical Man-month)
    

Traditionally, designing code around well thought-out data is always recommended. But in this age of big data, that advice has become more relevant. If your data model is poorly designed, the volume of data will eventually cause scalability and maintenance issues. I recommend using the following adage on how to balance code and data:

    Rule of Representation: Fold knowledge into data so program logic can
    be stupid and robust.

Think about how you can move the complexity from code to data. It is always harder to understand logic in code compared to data. UNIX has used this philosophy very successfully by giving many simple tools that can be piped to perform any kind of manipulation on textual data.

Finally, data has greater longevity than code. Enterprises might decide to rewrite entire codebases because they don't meet their needs anymore, but the databases are usually maintained and even shared across applications.

Well-designed databases are more of an art than a science. This chapter will give you some fundamental principles such as Normalization and best practices around organizing your data. But before that, let's look at where data models fit in a Django application.


#M is bigger than V and C
In Django, models are classes that provide an object-oriented way of dealing with databases. Typically, each class refers to a database table and each attribute refers to a database column. You can make queries to these tables using an automatically generated API.

Models can be the base for many other components. Once you have a model, you can rapidly derive model admins, model forms, and all kinds of generic views. In each case, you would need to write a line of code or two, just so that it does not seem too magical.

Also, models are used in more places than you would expect. This is because Django can be run in several ways. Some of the entry points of Django are as follows:

* The familiar web request-response flow
* Django interactive shell
* Management commands
* Test scripts
* Asynchronous task queues such as Celery

In almost all of these cases, the model modules would get imported (as a part of **django.setup()**). Hence, it is best to keep your models free from any unnecessary dependencies or to import any other Django components such as views.

In short, designing your models properly is quite important. Now let's get started with the SuperBook model design.

####The Brown Bag Lunch:
    Author's Note: The progress of the SuperBook project will appear in a box
    like this. You may skip the box, but you will miss the insights,
    experiences, and drama of working in a web application project.

    Steve's first week with his client, the SuperHero Intelligence and
    Monitoring (SHIM) for short, was a mixed bag. The office was incredibly
    futuristic, but getting anything done needed a hundred approvals and
    sign-offs.

    Being the lead Django developer, Steve had finished setting up a midsized development server hosting four virtual machines over two days.
    The next morning, the machine itself had disappeared. A washing
    machine-sized robot nearby said that it had been taken to the forensic
    department due to unapproved software installations.


    The CTO, Hart, was, however, of great help. He asked the machine to be
    returned in an hour with all the installations intact. He had also sent preapprovals for the SuperBook project to avoid any such roadblocks in the
    future.


    Later that afternoon, Steve was having a brown-bag lunch with him.
    Dressed in a beige blazer and light blue jeans, Hart arrived well in time.
    Despite being taller than most people and having a clean-shaven head, he
    seemed cool and approachable. He asked if Steve had checked out the
    previous attempt to build a superhero database in the sixties.

    "Oh yes, the Sentinel project, right?" said Steve. "I did. The database
    seemed to be designed as an Entity-Attribute-Value model, something
    that I consider an anti-pattern. Perhaps they had very little idea about the
    attributes of a superhero those days."

    Hart almost winced at the last statement. In a slightly lowered voice, he
    said, "you are right, I didn't. Besides, they gave me only two days to
    design the whole thing. I believe there was literally a nuclear bomb ticking
    somewhere."

    Steve's mouth was wide open and his sandwich had frozen at its entrance.
    Hart smiled. "Certainly not my best work. Once it crossed about a billion
    entries, it took us days to run any kind of analysis on that damn database.
    SuperBook would zip through that in mere seconds, right?"

    Steve nodded weakly. He had never imagined that there would be around
    a billion superheroes in the first place.



####The model hunt
Here is a first cut at identifying the models in SuperBook. As typical for an early attempt,
we have represented only the essential models and their relationships in the form of a
simplistic class diagram:

![The model hunt](./images/1.png)

Let's forget models for a moment and talk in terms of the objects we are modeling. Each user has a profile. A user can make several comments or several posts. A Like can be related to a single user/post combination.

Drawing a class diagram of your models like this is recommended . Class attributes might be missing at this stage, but you can detail them later. Once the entire project is represented in the diagram, it makes separating the apps easier.

Here are some tips to create this representation:
* Nouns in your write-up typically end up as entities.
* Boxes represent entities, which become models.
* Connector lines are bi-directional and represent one of the three types of
relationships in Django: one-to-one, one-to-many (implemented with Foreign
Keys), and many-to-many.
* The field denoting the one-to-many relationship is defined in the model on
the **Entity-relationship model (ER-model)**. In other words, the n side is where
the Foreign Key gets declared.

The class diagram can be mapped into the following Django code (which will be spread
across several apps):

```python

class Profile(models.Model):
    user = models.OneToOneField(User)
    
class Post(models.Model):
    posted_by = models.ForeignKey(User)

class Comment(models.Model):
    commented_by = models.ForeignKey(User)
    for_post = models.ForeignKey(Post)

class Like(models.Model):
    liked_by = models.ForeignKey(User)
    post = models.ForeignKey(Post)
```

Later, we will not reference the **User** directly, but use the more general **settings.AUTH_USER_MODEL** instead. 
We are also not concerned about field attributes such as **on_delete** or **primary_key** at this stage. We will get into those details soon.


