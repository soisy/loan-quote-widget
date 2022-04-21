![CICD](https://github.com/soisy/loan-quote-widget/workflows/CICD/badge.svg)
 
# Loan Quote Widget
Embed the loan quote widget in your e-commerce to show your customer how much they're going to pay with Soisy's instalments.
The embedding instructions are written in our [official documentation](https://doc.soisy.it/).

This repository is open-source so that, those who needs, could download it and customize their own version.
This software is provided under the [Mozilla Public License 2.0](LICENSE). Please check section 6 of the license.



## Requirements if you want to test locally

Please note that this project uses [Docker](https://www.docker.com) for development and CI/CD.
Therefore it is mandatory to have `docker` and `docker-compose` installed in your local environment.


## Local installation

**If you simply want to embed** the widget in your page please refer to our [official documentation](https://doc.soisy.it/).  
**If you want to have your own local copy, then please read further**. 

To install the widget's source locally please follow these instructions:

  - Git clone this repo to your local development environment
  - `cd` to the root of the project
  - Run `$ cd .docker` to go to the sub-directory where all the Docker's config files are.
  - Run `$ ./up`. This will take several minutes the first time, so don't be afraid to wait a little 😜

## Navigate in your browser

You can check your local widget running at this address [http://localhost:4200](http://localhost:4200).

NOTE: If the address above doesn't give you a response please note that the `npm i` command may still be installing and building something up. Wait another couple of minutes and you'll see everything's working.

## Running tests

This project uses [NX](https://nx.dev) as tool for development.  
You can execute the test suite by running
```sh
$ nx test
```
inside your docker container.

Refer to NX documentation or run `nx test --help` if you need more info.

## Updating NX

In case you need to update nx to a different major version chances are that you will need to upgrade your workspace as well.
NX provides you a migration feature, but migrating the workspace could not be an easy task.

It is best to migrate one major version at a time.
Here is the doc about migrations https://nx.dev/cli/migrate

To migrate the workspace you can run:

`nx migrate 11.0.0.0 // use desired version here
npm i 
nx migrate --run-migrations=migrations.json
`
for every major version you want to migrate to.
