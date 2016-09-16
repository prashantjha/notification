from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.template.context_processors import csrf
from django.template import RequestContext
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.utils import timezone

from forms import MyRegistrationForm
from datetime import  timedelta
from autogenerate.models import UserActivity, Notification
 
def get_online_users():
    fifteen_minutes = timezone.now() - timedelta(minutes=15)
    users = UserActivity.objects.filter(last_activity_date__gte=fifteen_minutes, user__is_active__exact=1).order_by('-last_activity_date')
    return [u.user for u in users]



def auth_view(request):
    """ If user is logedin then it will render to home else login page"""
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')

    user = auth.authenticate(username=username, password=password)
    if user is not None:
        auth.login(request, user)
        
        return HttpResponseRedirect('/')
    else:
        c = {}
        c.update(csrf(request))
        c['errors'] = True
        c['request'] = request
        return render_to_response('login.html',c,context_instance=RequestContext(request))

def logout(request):
    """ User session is made empty"""
    auth.logout(request)
    request.session = {}
    return HttpResponseRedirect('/admin/login/')

def signup(request):
    """ Provide interface for user to sign up"""
    if request.method == 'POST':
        form = MyRegistrationForm(request.POST)
        if form.is_valid():
            signu= form.save(commit=False)
            signu.save()
            return HttpResponseRedirect('/')
        else: 
            return render_to_response('signup.html', {'form': form}, context_instance=RequestContext(request))
    args = {}
    args.update(csrf(request))
    args['request'] = request
    args['form'] = MyRegistrationForm()
    return render_to_response('signup.html', args,context_instance=RequestContext(request))



@login_required(login_url='/admin/login/')
def index(request):
    """ Home page"""
    user = request.user
    notifications = Notification.objects.filter(user=user)
    newPostCount = Notification.objects.filter(checked = 0,user=user).count()
    c = {}
    c.update(csrf(request))
    c['request'] = request
    c['notifications'] = notifications
    c['newPostCount'] = newPostCount
    return render_to_response('index.html',c,context_instance=RequestContext(request))

@login_required(login_url='/admin/login/')
def newnotification(request):
    """ check new notification """
    user = request.user
    notifications = Notification.objects.filter(user=user, checked=0)
    newPostCount = Notification.objects.filter(checked = 0,user=user).count()
    c = {}
    c.update(csrf(request))
    c['request'] = request
    c['notifications'] = notifications
    c['newPostCount'] = newPostCount
    return render_to_response('index.html',c,context_instance=RequestContext(request))

def updatenotification(request, n_id):
    """ Toggle notification status"""
    notification = Notification.objects.get(id=n_id)
    notification.checked = not(notification.checked)
    notification.save()
    return