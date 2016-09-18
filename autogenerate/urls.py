from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^auth/$', views.auth_view),
    url(r'^logout/$', views.logout),
    # url(r'^login/$',views.login),
    url(r'^signup/$',views.signup, name='signup'),
    url(r'^newnotification/$',views.newnotification, name='newnotification'),
    url(r'^allnotification/$',views.allnotification, name='allnotification'),
    url(r'^allread/$',views.allread, name='allread'),
    url(r'^notification/(?P<page>\d+)$',views.notification, name='notification'),
    url(r'^updatenotification/(?P<n_id>\d+)$',views.updatenotification, name='updatenotification'),
    url(r'^hidenotification/(?P<n_id>\d+)$',views.hidenotification, name='hidenotification'),
    url(r'^allunhide/$',views.allunhide, name='allunhide'),
    url(r'^allunread/$',views.allunread, name='allunread'),
]