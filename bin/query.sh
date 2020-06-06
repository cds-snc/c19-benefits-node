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
query a039d6db-2d68-42de-b6f7-acc7fc36e9e0
query b0f5f391-19c7-455c-b48e-c6f023e6d26b
query f3b8e1fe-0d8e-42c6-8a20-2441de9c2d6f
query bff76c9f-e290-4c70-9ec5-77abdf84046b
query d9123436-31ec-4f18-839d-e3d767834cc7
query 4474a81d-2fc2-45a9-9ee0-90314352224f
query dc375769-90e8-4875-864b-df39851b8d96
query c26e6080-470c-417b-95bc-0d36bad5e348
query 114aa016-c650-4971-95f9-4474e9472666