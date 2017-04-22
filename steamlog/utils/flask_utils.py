from urllib.parse import urlparse, urljoin
from flask import request, abort


def is_safe_url(target):
    ref_url = urlparse(request.host_url)
    test_url = urlparse(urljoin(request.host_url, target))
    if (test_url.scheme in ('http', 'https') and ref_url.netloc == test_url.netloc):
        return True
    else:
        abort(400)
