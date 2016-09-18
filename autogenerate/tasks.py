from __future__ import absolute_import

from notification.celery import app
from django.core.mail import send_mail
from autogenerate.views import get_online_users
from autogenerate.models import Notification
from random import randint


@app.task
def mail(*args):
	send_mail(args[0], args[1], args[2],[args[3]], fail_silently=False)

@app.task
def add(x, y):
    return x + y


@app.task
def sendNotification():
	online_users = get_online_users()
	print "hello"
	for user in online_users:
		notification = Notification()
		notification.user = user
		notification.name = "Task genetated " + str(randint(0,100))
		notification.save()