#!/bin/sh

getSha() { 
    curl "$1" -s | grep 'github-sha' |  awk -F'"' '{ print $4 } '
}

checkSite() { 

    site_sha=$(getSha "$1" )

    if [ "$3" = "$site_sha" ];  then
        printf "✅ $1 verified\n"
    else 
        printf "🛑 $1 sha's don't match\n"
        printf "$site_sha !== $3\n"
    fi

}

printf "\nVerifying Development Deployment\n"
development=$(git rev-parse origin/master)
printf "latest commit in Development $development\n"
checkSite https://cv19benefits-appservice-dev.azurewebsites.net/en/start against "$development\n"

printf "Verifying Production Deployment\n"
staging=$(git rev-parse origin/staging)
printf "latest commit in Staging $staging\n"
checkSite https://covid-benefits.alpha.canada.ca/en/start against "$staging"
checkSite https://covid-prestations.alpha.canada.ca/fr/debut against "$staging"