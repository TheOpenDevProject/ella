Ella
========

Why Ella?, whats wrong with Natasha?
------
Time has come for us to re-think what our bot of the future is going to look like and how it will suit our needs.
Natasha (who was once called Olga) has done a great job over the years but we wish to change the infrastructure and how people can contribute.

Natasha has stored a whole heap of information (I think from 2011 onwards, maybe earlier) but we want to move logs and stats to the main database we already have running.

Here are our reasons for building a new bot:

* We want to seperate data from the bot, we now have a hashweb API (currently being used by [Hashweb Stats](http://stats.hashweb.org).
* Leaving things like logs and statistics to the main database means we can let the bot to make API calls and data comes from the same place. This also means we can open it up to the public (as its not directly communicating with a database)
* Development on Natasha is quite slow, as she is closed off with only 1 person maintaining her.  We don't want a single point of entry.
* We fancied using a new platform, the old bot was wrote in Python (a fork of limnoria) and does a great job. But if users are going to contribute we want a low barrier to entry, and thus decided Node JS was the best solution for that.
* I want to learn Node JS....
* By Moving to Github means we aremore open and users can view and learn about how the new bot will work.
    
## Running JavaScript
You can run javascript commands on the bot, this will run nodeJS in the background within a docker container (for saftey), then return the result back to the channel.   
You can also run babel too by using b>   
### Usage
n> [your command] or you can write babel in b> [your command]
for example:
```
n> return (1 + 2)
(okay) 3
