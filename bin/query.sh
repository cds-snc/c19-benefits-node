#!/bin/sh

# Query our app service logs for a session id and output it in a csv 

removeNewLine='s/\\n//g'
removeEscapedQuote='s/\\"/"/g'
removeWrappingQuotes='s/^\"\(.*\)\"$/\1/'

query() { 
    q="AppServiceConsoleLogs \
    | where ResultDescription \
    contains '$1'"
    az monitor log-analytics query \
        -w 06610262-2922-4282-a71d-fda0625b6fe4 \
        --analytics-query "$q" | \
    jq '.[] | .ResultDescription ' | \
    sed "$removeWrappingQuotes" | \
    sed  "$removeNewLine" | \
    sed  "$removeEscapedQuote" | \
    jq '. | select(.method == "GET") | [.id,.url,(select(.data != null) | (.data | [to_entries | .[] | .key + "=" + (.value| tostring)] | join("|")))] | @csv ' 
}


## Run it on the following Session IDs
# query 2f0c7f09-7f53-491a-9c28-4d7ab94cb796
# query 0dc78079-ba91-4b8a-9c85-0e359987532m