# Notification
	A task is generared for logined user. User can mark it done or reverse.


## Installation

    git clone https://github.com/prashantjha/notification.git
    cd notification

## Run application
    python manage.py runserver

## Run Celery
	worker: python manage.py celery worker
	celery_beat: python manage.py celery beat

## Refresh the page

## Experiment
	Used inbuilt django-admin login, logout. 

## Challange facced and solution
	Even though user is switch off the application or idel, it's data will be present in seesion for next 15 days.
	So, if we try to get all logged in user it may contain the idel use.

	### Solution 
		Create a new Middleware that takes the request and finds the user, then updates his/her last activity.