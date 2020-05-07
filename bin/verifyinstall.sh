#!/bin/sh

getSha() { 
    curl "$1" -s | grep 'github-sha' |  awk -F'"' '{ print $4 } '
}

checkSite() { 

    site_sha=$(getSha "$1" )

    if [ "$3" = "$site_sha" ];  then
        printf "✅ %s verified\n" "$1"
    else 
        printf "🛑 %s sha's don't match\n" "$1"
        printf "$site_sha !== %s\n" "$3"
    fi

}

printf "\nVerifying Development Deployment\n"
development=$(git rev-parse origin/master)
printf "latest commit in Development %s \n" "$development"
checkSite https://cv19benefits-appservice-dev.azurewebsites.net/en/start against "$development"

printf "\nVerifying Production Deployment\n"
staging=$(git rev-parse origin/staging)
printf "latest commit in Staging %s\n" "$staging"
checkSite https://covid-benefits.alpha.canada.ca/en/start against "$staging"
checkSite https://covid-prestations.alpha.canada.ca/fr/debut against "$staging"