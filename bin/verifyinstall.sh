#!/bin/sh

getSha() { 
    curl "$1" -s | grep 'github-sha' |  awk -F'"' '{ print $4 } '
}

checkSite() { 

    site_sha=$(getSha "$1" )

    if [ "$3" = "$site_sha" ];  then
        echo "✅ $1 verified"
    else 
        echo "🛑 $1 sha's don't match"
        echo "$site_sha !== $3"
    fi

}

echo "Verifying Development Deployment"
development=$(git rev-parse origin/master)
echo "latest commit in Development $development"
checkSite https://cv19benefits-appservice-dev.azurewebsites.net/en/start against "$development"

echo "Verifying Production Deployment"
staging=$(git rev-parse origin/staging)
echo "latest commit in Staging $staging"
checkSite https://covid-benefits.alpha.canada.ca/en/start against "$staging"
checkSite https://covid-prestations.alpha.canada.ca/fr/debut against "$staging"