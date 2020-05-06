#!/bin/sh

gitsha=$(git rev-parse origin/staging)
engsha=$(curl https://covid-benefits.alpha.canada.ca/en/start -s | grep 'github-sha' | awk '{ print $3}' | awk -F'"' '{ print $2 } ')
frasha=$(curl https://covid-prestations.alpha.canada.ca/fr/debut -s | grep 'github-sha' | awk '{ print $3}' | awk -F'"' '{ print $2 } ')

echo "GitSha $gitsha"
echo "English Sha $engsha"
echo "French Sha $frasha"

if [ "$gitsha" = "$engsha" ];  then
    echo "English Site Verified"
else 
    echo "English sha's don't match"
fi
if [ "$gitsha" = "$frasha" ]; then
    echo "French Site Verified"
else
    echo "French sha's don't match"
fi