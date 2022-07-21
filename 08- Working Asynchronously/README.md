# 8 Working Asynchronously

In this chapter, we will cover the following topics:

- Need for asynchronous
- Asynchronous patterns
- Working with Celery
- Understanding asyncio
- Entering channels

In simpler times, a web application used to be a large monolithic Django process that can handle a request and block until the response is generated.

In today's microservices world, applications are made up of a complex and often- interlocking chain of processes providing specialized services. Django is possibly one of the links in an application flow. As Eliyahu Goldratt would say, "the chain is only as strong as its weakest link". In other words, the synchronous nature of Django can potentially make it a performance bottleneck.

Hence, there are various asynchronous solutions built around Django that can help you retain the fast response times as well as satisfy the asynchronous nature of today's applications.

**Why asynchronous?**

Like most WSGI-based web frameworks, Django is synchronous. When a client requests a web page, the request reaches Django through a view and passes through various lines of code until the rendered web page is returned. As this communication waits or blocks until the process executes all this code, it is termed as synchronous.


New Django developers do not worry about creating asynchronous tasks, but I've noticed that their code eventually accumulates slow blocking tasks, such as image processing or even complex database queries, which leads to unbearably slow page loads. Ideally, they must be moved out of the request-response cycle. Page loading time is critical to user experience, and it must be optimized to avoid any delays.

Another fundamental problem of this synchronous model is the handling of events that are not triggered by web requests. Even if a website does not have any visitors, it must attend to various maintenance activities. They can be scheduled at a particular time like sending a newsletter at Friday midnight, or routine background tasks such as scanning uploaded files for viruses. Some sites might offer real-time updates or push notifications through WebSockets that cannot be handled by the WSGI model.

Some of the typical kinds of asynchronous tasks are:

- Sending a single or mass emails/SMS
- Calling web services
- Slow SQL queries
- Logging activity
- Media encoding or decoding
- Parsing a large corpus of text
- Web scraping
- Sending newsletters
- Machine learning tasks ![](52pt3k0t.002.png) Image processing

As you can see, every non-trivial Django project will need infrastructure to manage asynchronous tasks. You might also find your code running several times faster with a single process when you switch to asynchronous code (refer to the _Understanding asyncio_ section for a dramatic example of speedup). This is because all the time you were waiting for an I/O task to complete is now better utilized running other tasks.

**Pitfalls of asynchronous code**

Asynchronous programming might sound very compelling, but it is very difficult to master.

There are several pitfalls that you need to be aware of, such as the following:

- **Race condition**: If two or more threads of code modify the same data, the order in which they get executed can affect the final value. This race can lead to data being in an undetermined state.
- **Starvation**: Indefinite waiting by one thread due to other threads coming in.
- **Deadlock**: If a thread is waiting for a resource that another thread has locked, and vice versa at the same time, then both threads are stuck in a deadlock.
- **Debugging challenge**: It is very hard to reproduce a bug in asynchronous code due to the non-deterministic timing of a multithreaded program.
- **Order preservation**: There might be dependencies between sections of code that might not be observed when the execution order varies.

In Python, it might be impossible to completely avoid such pitfalls, but we can follow some best practices to eliminate them for most practical purposes. They will be covered in the _Celery best practices_ section.

**Asynchronous patterns**

Let's look at various general patterns that have been used in web applications.

**Endpoint callback pattern**

In this pattern, when a caller calls a service, it specifies an endpoint to be called when the operation is completed. This is similar to specifying callbacks in some programming languages like JavaScript. When used purely as an HTTP callback, it is called a **WebHook**.

The process is roughly as follows:

1. The client calls a service through a channel such as REST, RPC, or UDP. It also provides its own endpoint to notify when the result becomes ready.
1. The call returns immediately.
1. When the task is completed, the service calls the defined endpoint to notify the initial sender.

Remember that the service provider or receiver must be able to access the sender. For sensitive data, there must be some form of authentication to identify the sender and encryption to protect the channel from eavesdropping.

This pattern is quite popular and implemented by various web applications, such as GitHub, PayPal, Twilio, and more. These providers usually have an API to manage subscriptions to these WebHooks, unless you have a broker to perform such mediation.

**Publish-subscribe pattern**

This pattern is a more general form of the endpoint callback pattern. Here, a broker acts as an intermediary between the actual sender and recipients. Yes, multiple recipients can subscribe to a _topic_ i.e. a named logical group of channels published by anyone.

In this case, the process of communication is as follows:

1. One or more listeners will inform a broker process that they are interested in subscribing to a topic
1. A publisher will post a message to the broker under the relevant topic
1. The broker dispatches the message to all the subscribers

A broker has the advantage of fully decoupling the sender and receiver in many senses. Additionally, the broker can perform many additional tasks, such as message enrichment, transformation, or filtering. This pattern is quite scalable and, hence, popular in enterprise middleware.

Celery internally uses publish/subscribe mechanisms for several of its backend transports, such as Redis for sending messages.

**Polling pattern**

Polling, as the name suggests, involves the client periodically checking a service for any new events. This is often the least desirable means of asynchronous communication as polling increases system utilization and becomes difficult to scale. Yet, it might be the only feasible solution in a legacy system.

A polling system works as follows:

1. The client calls a service
1. The call returns immediately with new events or the status of the task
1. The client waits and repeats step two at periodic intervals

There might be some degree of synchronous delay while retrieving the status of the service. The client might be blocking until the response arrives. Hence, it is sometimes referred to as **busy-waiting**.

**Asynchronous solutions for Django**

The rest of this chapter will cover the following popular asynchronous systems used with Django, with somewhat different use cases. They are as listed as follows:

- **Celery**: Worker threads-based model for handling computation outside the Django process
- **asyncio**: Python built-in module for concurrently executing multiple tasks within the same thread
- **Django Channels**: Real-time message queue-like architecture to manage I/O events such as WebSockets

Let's first understand the most popular and robust solution for running tasks asynchronously: Celery.

**Working with Celery**

Celery is a feature-rich asynchronous task queue manager. Here, a task refers to a callable that, when executed, will perform the activity asynchronously. Celery is used in production by several well-known organizations including Instagram and Mozilla, for handling millions of tasks a day.

While installing Celery, you will need to pick and choose various components such as a broker and result store. If you are confused, I would recommend installing Redis and skipping a result store for starters. As Redis works in-memory, if your messages are larger and need persistence, you should use RabbitMQ instead. You can follow the [First Steps](http://docs.celeryproject.org/en/latest/getting-started/first-steps-with-celery.html)

[with Celery and](http://docs.celeryproject.org/en/latest/getting-started/first-steps-with-celery.html) Using[ Celery with Django topics in the](http://docs.celeryproject.org/en/latest/django/first-steps-with-django.html) Celery User Guide to get started.

In Django, Celery jobs are usually mentioned in a separate file named tasks.py within the respective app directory.

Here's what a typical Celery task looks like:

\ # tasks.py

```python
@shared_task
def fetch_feed(feed_id):
    feed_obj = models.Feed.objects.get(id=feed_id)
    feed_obj.page = retrieve_page(feed_obj.feed_url)
    feed_obj.retrieved = timezone.now()
    feed_obj.save()
```

This task retrieves the content of an RSS feed and saves it to the database.

It looks like a normal Python function (even though it will be internally wrapped by a class), except for the @shared_task decorator. This defines a Celery task. A shared task can be used by other apps within the same project. It makes the task reusable by creating independent instances of the task in each registered app.

To invoke this task, you can use the delay() method, as follows:

```python
>>> from tasks import fetch_feed
>>> fetch_feed.delay(feed_id=some_feed.id)
```

Unlike a normal function call, the execution does not jump to fetch_feed or block until the function returns. Instead, it returns immediately with an AsyncResult instance. This can be used to check the status and return value of the task.

To find out how and when it is invoked, let's look at how Celery works.

**How Celery works**

Celery can be somewhat difficult to understand due its distributed architecture. Here's a high-level diagram showing a typical Django-Celery setup:

![](/08-%20Working%20Asynchronously/image-000.png)

How a typical Django Celery setup works

When a request arrives, you can trigger a Celery task while handling it. The task invocation returns immediately without blocking the process. In fact, the task has not finished execution, but a task message has entered a task queue (or one of the many possible task queues).

Workers are separate processes that monitor the task queue for new tasks and actually execute them. They pick up a task message and send an acknowledgment to the queue so that the message is removed. Then they execute the task. Once completed, the process repeats, and it will try to pick up another task for execution.

A worker can get blocked executing a slow task or waiting for I/O, but it does not affect the Django process by design. When the task is completed, you may configure a result store to store the results persistently. In many cases, the side effect of the task is needed and the returned result is ignored, so the result store is not required.

A task can also be scheduled to run periodically using what Celery calls a Celery beat process. You can configure it to kick off tasks at certain time intervals, such as every 10 seconds or at the start of a day of the week. This is great for maintenance jobs such as backups or polling the health of a web service.

Celery is well-supported, scalable, and works well with Django, but it might be too cumbersome for trivial asynchronous tasks. In such cases, I would recommend using Django Channels or RQ, a simpler Redis-based task queue. However, the best practices discussed in the next section might apply to them as well.

**Celery best practices**

You have seen how Celery can take a lot of the heavy lifting from Django, but working with Celery is quite different from Django due to its rich feature set. There are tons of best practices mentioned in the documentation and shared in several blog posts.

If you are already familiar with the concepts and want a quick checklist, check out the Celery tasks checklist at [http://celerytaskschecklist.com/. Otherwise, ](http://celerytaskschecklist.com/)read on to understand how to get the best out of Celery.

**Handling failure**

All sorts of exceptions can happen while executing a Celery task. In the absence of a well- defined exception handling and retry mechanism, they can go undetected. Often, a job failure is temporary, such as an unresponsive API (which is beyond our control) or running out of memory. In such cases, it is better to wait and retry the task.

In Celery, you can choose to retry automatically or manually. Celery makes it easy to fine- tune its automatic retry mechanism. In the following example, we specify multiple retry parameters:

```python
@shared_task(autoretry_for=(GatewayError,),
               retry_backoff=60,
               retry_kwargs={'max_retries': 5},
               retry_jitter=True)
              def fetch_feed(feed_id):
                  ...
```

The autoretry_for argument lists all the exceptions for which Celery should automatically retry. In this case, it is just the GatewayError exception. You may also mention the exception base class here to autoretry_for all exceptions.

The retry_backoff argument specifies the initial wait period before the first retry, that is, 60 seconds. Each time a retry fails, the waiting period gets doubled, so the waiting period becomes 120, 240, and 360 seconds, until the maximum retry limit of 5 is reached.

This technique of waiting longer and longer for a retry is called **exponential backoff**. This is ideal for interacting with an external server as we are giving it sufficient time to recover in case of a server overload.

A random jitter is added to avoid the problem of **thundering herds**. If a large number of tasks have the same retry pattern and request a resource at the same time, it might make it unusable.

Hence, a random number is added to the waiting period so that such collisions do not occur.

Here's an example of manually retrying in case of an exception:

```python
@shared_task(bind=True)
    def fetch_feed(self, feed_id):
        ...
        try:
            ...
        except (GatewayError) as exc:
            raise self.retry(exc=exc)
```

Note the bind argument to the task decorator and a new self argument to the task, which will be the task instance. If an exception occurs, you can call the self.retry method to attempt a retry manually. The exc argument is used to pass the exception information that can be used in logs.

Last but not least, ensure that you log all your exceptions. You can use the standard Python logging module or the print function (which will be redirected to logs) for this. Use a tool such as Sentry to track and automate error handling.

**Idempotent tasks**

As we saw, Celery tasks may be restarted several times, especially if you have enabled late acknowledgments. This makes it important to control the side effects of a task. Hence, Celery recommends that all tasks should be _idempotent_. Idempotence is a mathematical property of a function that assures that it will return the same result if invoked with the same arguments, no matter how many times you call it.

You might have seen simple examples of idempotent functions in the Celery documentation itself, such as this:

```python
@app.task def add(x, y):

    return x + y
```

No matter how many times we call this function, the result of add(2, 2) is always 4.

However, it is important to understand the difference between an idempotent function and a function having no side effects (a pure or _nullipotent_ function). The side effect of an idempotent will be the same, regardless of whether it was called once or several times. For example, a task that always places a fresh order when called is not idempotent, but a task that cancels an existing order is idempotent. Operations that only read the state of the world and do not have any side effects are nullipotent.

As Celery architecture relies on tasks being idempotent, it is important to try to study all the side effects of a non-idempotent task and convert it into an idempotent task. You can do this by either checking whether the tasks have been executed previously (if it was, then abort) or storing the result in a unique location based on the arguments. An example of the latter is given in the _Avoid writing to shared or global state_ section.

Finally, call your task multiple times to test whether it leaves your system in the same state.

**Avoid writing to shared or global state**

In a concurrent system, you can have several readers; however, the moment you have many writers accessing a shared state, you become vulnerable to the dreaded race conditions or deadlocks. It takes some planning and ingenuity to avoid all that.

First, let's try to understand a race condition. Consider a Celery task _A_ that performs some impressive image processing (such as matching your face to a celebrity). In a batch run, it picks the ten oldest uploaded images and updates a global counter.

It first reads the counter's value from a database, increments it by the number of successful image matches and then overwrites the old value with the new value. Imagine that we start another identical task _B_ in parallel to speed up the conversions.

Now, if _A_ and _B_ reads the counter at the exact same time, they will overwrite each other's value by the end of the task, so the final value will be based on who writes in the end. In fact, the global counter's value will be highly dependent on the order in which the tasks are executed. Thus, race conditions result in invalid or corrupt data.

Of course, the real issue is that the tasks are not aware of each other and a simple lock might resolve it, but locks or other synchronization primitives have problems of their own, such as starvation or deadlocks.

A practical solution will be to insert the status of each image into a table indexed with the unique identifier of an image like its hash value or file path:

| **Image hash**          | **Competed at**           | **Matched image path** |
| ----------------------- | ------------------------- | ---------------------- |
| SHA256: b4337bc45a8f... | 2018-02-09T15:15:11+05:30 | /celeb/7112.jpg        |
| SHA256:550cd6e1e8702... | 2018-02-09T15:17:24+05:30 | /celeb/3529.jpg        |

You can find the total number of successful matches by counting rows in this table. Additionally, this approach allows you to break down the successful matches by date or time.

The race conditions are avoided, as we do not overwrite a global state. The only possibility of a shared state being overwritten is when two or more tasks pick up the same image for processing. Even if this happens, there is no data corruption as the result is the same and the result of the last task to finish will prevail.

**Database updates without race conditions**

You might come across situations where updating a shared state is unavoidable. You can use row-level locks if your database supports it or Django F() objects. Notably, MySQL using MyISAM engine does not have support for row-level locks.

Row-level locks are done in Django by calling select_for_update() on your QuerySet within a transaction. Consider this example:

```python
with transaction.atomic():
    feed = Feed.objects.select\_for\_update().get(id=id)
    feed.html = sanitize(feed.html)
    feed.save()
```

By using select_for_update, we lock the Feed object's row until the transaction is done.
If another thread or process has already locked the same row, the query will be waiting or
blocked until the lock is freed. This behavior can be changed to throw an exception or skip
it if locked, using the select_for_update keyword parameters.

If the operation on the field can be done within the database using SQL, it is better to use F() expressions to avoid a race condition. F() expressions avoid the need to pull the value from the database to Python memory and back. Consider the following instance:

```python
from django.db.models import F
feed = Feed.objects.get(id=id)
feed.subscribers = F('subscribers') + 1
feed.save()
```

It is only when the save() operation is performed that the increment operation is converted to an SQL expression and executed within the database. At no point is the number of feed subscribers retrieved from the database. As the database updates the new value based on the old, there is hardly a chance for a race condition between multiple threads.

**Avoid passing complex objects to tasks**

It is easy to forget that each time we call a Celery task, the arguments get serialized before it enters the queue. Hence, it is not advisable to send a Django ORM object or any large object that might clog up the queues.

There is another good reason to avoid sending a database object. Due to the asynchronous nature of execution, the data can be outdated by the time the task has begun execution. The record might have changed or even deleted.

So, always pass a primary key or lookup value and retrieve the latest value of the object from the database. Celery documents refer to this as the responsibility of asserting that the world lies with the task. Ensure that your world is the present one, not the past.

**Understanding asyncio**

asyncio is a co-operative multitasking library available in Python since version 3.6. Celery is fantastic for running concurrent tasks out of a process, but there are certain times you will need to run multiple execution threads within the same process.

If you are not familiar with async/await concepts (say from JavaScript or C#), it involves a bit of a steep learning curve. However, it is well worth your time, as it can speed up your code tremendously (unless it is completely CPU-bound). Moreover, it helps in understanding other libraries built on top of them, such as Django Channels.

All asyncio programs are driven by an event loop, which is pretty much an infinite loop that calls all registered coroutines in some order. Each coroutine operates cooperatively by yielding control to fellow coroutines at well-defined places. This is called awaiting.

A coroutine is like a special function that can suspend and resume execution. It works in the same way as lightweight threads. Native coroutines use the async and await keywords, as follows:

```python
import asyncio
async def sleeper_coroutine():
    await asyncio.sleep(5)
if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(sleeper_coroutine())
```

This is a minimal example of an event loop running one coroutine named sleeper_coroutine. When invoked, this coroutine runs until the await statement and yields control back to the event loop. This is usually where an I/O activity occurs.

The control comes back to the coroutine at the same line when the activity being awaited is completed (after 5 seconds). Then, the coroutine returns or is considered completed.

**asyncio versus threads**

If you have worked on the multithreaded code, then you might wonder, why not just use threads? There are several reasons why threads are not popular in Python.

Firstly, threads need to be synchronized while accessing shared resources, or we will have race conditions. There are several types of synchronization primitives like locks but essentially, they involve waiting, which degrades performance and can cause deadlocks or starvation.

coroutine has well-defined places where execution is handed over. As a result, you can make changes to a shared state as long as you leave it in a known state. For instance, you can retrieve a field from a database, perform calculations, and overwrite the field without worrying that another coroutine might have interrupted you in between.

Secondly, coroutines are lightweight. Each coroutine needs significantly less memory than a thread. If you can run a maximum of hundreds of threads, you might be able to run tens of thousands of coroutines, given the same memory. Thread switching also takes

some time (a few milliseconds). This means you might be able to run more tasks or serve more concurrent users.

The downsides of coroutines is that you cannot mix blocking and non-blocking code. So once you enter the event loop, the rest of the code must be written in an asynchronous style, even the libraries you use. This might make using some older libraries with synchronous code slightly difficult.

**The classic web-scraper example**

Let's look at an example of how we can convert synchronous code into asynchronous. We will look at a web scraper that downloads pages from a couple of URLs and measures their size. This is a popular example because it is very I/O bound and shows a significant speedup when handled concurrently.

**Synchronous web-scraping**

The synchronous scraper only uses Python standard libraries such as urllib. It downloads the home page of three popular sites and a fourth site whose loading time can be delayed to simulate a slow connection. It prints the respective page sizes and the total running time.

Here's the code for the synchronous scraper located at src/extras/sync.py:

"""Synchronously download a list of webpages and time it"""

```python
from urllib.request import Request, urlopen
from time import time
sites = [
"http://news.ycombinator.com/",
"https://www.yahoo.com/",
"http://www.aliexpress.com/",
"http://deelay.me/5000/http://deelay.me/",
]
def find_size(url):
  req = Request(url)
  with urlopen(req) as response:
    page = response.read()
    return len(page)
def main():
    for site in sites:
        size = find_size(site)
        print("Read {:8d} chars from {}".format(size, site))
if __name__ == '__main__':
    start_time = time()
    main()
    print("Ran in {:6.3f} secs".format(time() - start_time))
```

On a test laptop, this code took 17.1 seconds to run. It is the cumulative loading time of each site. Let's see how asynchronous code runs.

**Asynchronous web-scraping**

This asyncio code requires an installation of a few Python asynchronous network libraries, such as aiohttp and aiodns. They are mentioned in the docstring. Here's the code for the asynchronous scraper at src/extras/async.py; it is structured to be as close as possible to the synchronous version so that it's easier to compare:

"""Asynchronously download a list of webpages and time it Dependencies: Make sure you install aiohttp

```python
import asyncio
import aiohttp
from time import time

sites = [
    "http://news.ycombinator.com/",
    "https://www.yahoo.com/",
    "http://www.aliexpress.com/",
    "http://deelay.me/5000/http://deelay.me/",
]
async def find_size(session, url):
    async with session.get(url) as response:
        page = await response.read()
        return len(page)

async def show_size(session, url):
    size = await find_size(session, url)
    print("Read {:8d} chars from {}".format(size, url))

async def main(loop):
    async with aiohttp.ClientSession() as session:
        tasks = []
        for site in sites:
            tasks.append(loop.create_task(show_size(session, site)))
        await asyncio.wait(tasks)

if __name__ == '__main__':
    start_time = time()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main(loop))
    print("Ran in {:6.3f} secs".format(time() - start_time))
```

The main function is a coroutine that triggers the creation of a separate coroutine for each website. Then, it waits until all these triggered coroutines are completed. As a best practice, the web session object is passed to avoid recreating new sessions for each page.

The total running time of this program on the same test laptop is 7.5 s. This is a speedup of 2.3x on a single core. This surprising result can be better understood if we can visualize how the time was spent, as shown in the following diagram:

![](/08-%20Working%20Asynchronously/image-001.jpg)

A simplistic representation comparing tasks in the synchronous and asynchronous scrapers

The **Synchronous scraper** is easy to understand. Each task is waiting for the previous task to complete. Each task needs very little CPU time and the majority of the time is spent waiting for the data to arrive from the network. As a result, the tasks cascade sequentially like a waterfall.

On the other hand, the **Asynchronous scraper** starts the first task and, as soon as it starts waiting for I/O, it switches to the next task. The CPU is hardly idle as the execution goes back to the event loop as soon as the waiting starts. Eventually, the I/O completes in the same amount of time, but due to the multiplexing of activity, the overall time taken is drastically reduced.

In fact, the asynchronous code can be sped up further. The standard asyncio event loop is written in pure Python and provided as a reference implementation. You can consider faster implementations such as [uvloop to](http://uvloop.readthedocs.io/) speed things up further.

**Concurrency is not parallelism**

**Concurrency** is the ability to perform other tasks while you are waiting on the current task. Imagine that you are cooking a lot of dishes for some guests. While waiting for something to cook, you are free to do other things like peeling onions or cutting vegetables. To make an analogy in the world of superheroes, a superhero might battle several bad guys at one place because most would be either recovering from a blow, arriving (or _ahem_ waiting for their turn), which leaves our hero to deliver blows one at a time.

**Parallelism** is when two or more execution engines are performing a task. Continuing on our analogy, this is when two or more superheroes battle enemies as a team. This is not only a great cinema franchise opportunity, but also more productive than a single hero working at maximum efficiency.

It is very easy to confuse concurrency and parallelism because they can happen at the same time. You could be concurrently running tasks without parallelism or vice versa, but they refer to two different things. Concurrency is a way of structuring your programs, while parallelism refers to how it is executed.

Due to the **global interpreter lock** (**GIL**), we cannot run more than one thread of the Python interpreter (to be specific, the standard CPython interpreter) at a time, even in multicore systems. This limits the amount of parallelism that we can achieve with a single instance of the Python process.

Optimal usage of your computing resources requires both concurrency and parallelism. Concurrency will help you avoid blocking the processor core while waiting for, say, I/O events, while parallelism will help to distribute work among all the available cores.

In both cases, you are not executing synchronously, that is, waiting for a task to finish before moving on to another task. Asynchronous systems might seem to be the most optimal; however, they are harder to build and reason about.

**Entering Channels**

Django Channels was originally created to solve the problem of handling asynchronous communication protocols, such as WebSockets, for example. More and more web applications were providing real-time capabilities such as chat and push notifications. Various hacks were created to make Django support requirements including running separate socket servers or proxy servers.

Channels is an official Django project, not just for handling WebSockets and other forms of bi-directional communication but also for running background tasks asynchronously.

As at the time of writing, Django Channels 2 is out, which is a complete rewrite based on Python 3's async/await-based coroutines.

Here's a simplified block diagram of a typical Channels setup:

![](/08-%20Working%20Asynchronously/image-002.png)

How a typical Django Channels infrastructure works

A client, such as a web browser, sends both HTTP/HTTPS and WebSocket traffic to

an **Asynchronous Server Gateway Interface** (**ASGI**) server such as Daphene. Like WSGI, the ASGI specification is a common way for application servers and applications to interact with each other asynchronously.

Like a typical Django application, HTTP traffic is handled synchronously, that is, when the browser sends a request, it waits until it is routed to Django and a response is sent back. However, it gets a lot more interesting when WebSocket traffic happens, because it can be triggered from either direction.

Once a WebSocket connection is established, a browser can send or receive messages. A sent message reaches the protocol type router that determines the next routing handler based on its transport protocol. Hence, you can define a router for HTTP and another for WebSocket messages.

These routers are very similar to Django's URL mappers, but map the incoming messages to a consumer (rather than a view). A consumer is like an event handler that reacts to events. It can also send messages back to the browser, thereby containing the logic for a fully bi-directional communication.

A consumer is a class whose methods you may choose to write either as normal Python functions (synchronous) or as awaitables (asynchronous). An asynchronous code should not mix with synchronous code, so there are conversion functions to convert from async to sync and back. Remember that the Django parts are synchronous. A consumer is, in fact, a valid ASGI application.

So far, we have not used the Channel layer. Ironically, you can write Channel applications without using Channels! However, they are not particularly useful as there is no easy communication path between application instances, other than polling a database. Channels provide exactly that, a fast point-to-point and broadcast messaging between application instances.

A channel is like a pipe. A sender sends a message to this pipe from one end, and it reaches a listener at the other end. A group defines a group of Channels who are all listening to a topic. Every consumer listens to their own autogenerated channel accessed by its self.channel_name attribute.

In addition to transports, you can trigger a consumer listening to a channel by sending a message, thereby starting a background task. This works as a very quick and simple background worker system.

**Listening to notifications with WebSockets**

Instead of the usual chat example, let's look at an example better suited to a social network to illustrate Channels—a notification app. The app will detect whenever a certain type of model is saved and push a notification to all clients (that is, browsers of all the connected users) in real time.

Assuming that Channels is properly installed and configured, we need to define all the protocol type routes in the routing.py file, as follows:

```python
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from notifier.consumers import NotificationConsumer
application = ProtocolTypeRouter({
    "websocket": URLRouter([
        path("notifications/", NotificationConsumer),
    ]),
})
```

HTTP requests are sent to Django, by default. This leads us to the code of the consumer, residing within the notification app itself as consumers.py:

```python
from channels.generic.websocket import AsyncJsonWebsocketConsumer
class NotificationConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("gossip", self.channel_name)

async def disconnect(self, close_code):
    await self.channel_layer.group_discard("gossip", self.channel_name)

async def name_gossip(self, event):
    await self.send_json(event)
```

For convenience, we are using a generic consumer class called AsyncJsonWebsocketConsumer, which handles WebSocket communication by translating to and from the JSON format.

The connect method simply accepts a connection and adds its channel to the gossip Channel group. Now, any message posted to this group will invoke an appropriately named class method of this consumer.

We are only interested in messages that have the name.gossip type; hence, we have created a method called name_gossip (dots are translated into underscores). This method simply sends the given event object to the WebSocket, which is received by the browser.

The disconnect method ensures that the consumer's Channel is removed from the group when the connection is closed. Thus, we will have only active channels in the group.

The only remaining bit of the puzzle is what triggers the event. We have the following code in the signals.py file of the app:

```python
from .post.models import Post
from django.db.models.signals import pre_save
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
@receiver(pre_save, sender=Post)
def notify_post_save(sender, **kwargs):
    if "instance" in kwargs:
    instance = kwargs["instance"]
\    # check if it is a new post
    ...
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "gossip", {"type": "name.gossip",
                  "event": "New Post",
                  "sender": instance.posted_by.get_full_name(),
                  "message": instance.message})
```

We are adding a hook to be called whenever a Post object (it can be any object for that matter) is saved. As we are only interested in new posts, we check and ignore the edits of the existing posts.

Before we send anything to a channel, we need to retrieve the channel_layer. Then, we need to use the group_send method to send the message to the gossip group. However, this is an asynchronous method, and we are in the Django world, so it is happening synchronously. Hence, we wrap the call using an async_to_sync converter, making it essentially block until the async function returns.

As you might have noted, Channels uses the publish-subscribe pattern. The design of channels deliberately avoids waiting for an event and, hence, prevents deadlocks. By basing on asyncio, we can build true asynchronous applications with Django.

**Differences from Celery**

With the ability to run background tasks using workers, you might naturally be confused if Channels can replace Celery. There are primarily two major differences: message delivery guarantees and task statuses.

Channels, currently implemented with a Redis backend, provide an at best one-off guarantee, while Celery provides an at least one-off guarantee. This essentially means that Celery will retry when a delivery fails until it receives a successful acknowledgment. In the case of Channels, it is pretty much fire-and-forget.

Secondly, Channels does not provide information on the status of a task out of the box. We need to build such functionality ourselves, for instance by updating the database. Celery tasks status can be queried and persisted.

To sum up, you can use Channels instead of Celery for some less critical use cases. However, for a more robust and proven solution, you should rely on Celery.

**Summary**

In this chapter, we looked at various ways to support asynchronous execution in Django. They provide powerful abstractions on top of Django to create applications that can support push notifications, display the progress of a slow task, communicate with other users, or run background tasks.

Traditionally, Celery has been the tool of choice for asynchronous activities. However, Channels provide a lighter and more tightly integrated solution. Both have their uses and can be used in the same project. Use the right tool for the job!

In the next chapter, we will look at what RESTful APIs means and how we can implement them in Django using current best practices.
