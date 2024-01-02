#!/bin/bash

set -o errexit
set -o nounset

celery -A core.core worker -l INFO 