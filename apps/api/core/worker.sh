#!/bin/bash

set -o errexit
set -o nounset

celery -A core worker -l INFO 