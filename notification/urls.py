from django.conf.urls import include, url
from django.contrib import admin
from notification import settings

urlpatterns = [
    url(r'', include('autogenerate.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
]

if not settings.DEBUG:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    urlpatterns += staticfiles_urlpatterns()