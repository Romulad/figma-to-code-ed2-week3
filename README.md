# Tokena : Crypto dashboard with real time data


## You can:
- View the list of trending cryptocurrencies.
- View a list of over 200 cryptocurrencies ranked by market rank,\ 
with various details such as **market cap**, **24-hour performance**, **price**, and more.
- Click on a specific cryptocurrency to see more details.
- Filter cryptocurrencies by categories or by a custom search value.
- Use your preferred site theme mode: dark or light.


Live version : ["click here"](https://tokena-ro.vercel.app)


## Technologies
1. **TypeScript**
2. **NextJs**
3. **Tailwind CSS**


The figma mockup used to create this app can be found ["here"](https://www.figma.com/design/FHEN8l5THsabutI06zIgON/Tokena?node-id=0-1&t=OqqOP4nhxQQGVZ78-1)\
and was an initiative by the [`figmaToCode`](https://www.figmatocodechallenge.com) team 🙏.


## Run locally


#### Clone the repo
First of all you need [Git](https://git-scm.com/downloads) on your system\
to be able to clone the repository.

The following instructions assume that [Git](https://git-scm.com/downloads)\
is installed:

- Open your terminal
- navigate to the folder where you want to clone the repository
- clone the repository to your local machine by running:
```bash
git clone https://github.com/Romulad/figma-to-code-ed2-week3.git
```
- then navigate to the newly created directory to follow the next instructions:
```bash
  cd figma-to-code-ed2-week3
```

***important***: The app use the Gecko API, so to see real data, you'll need to first\
set up a `.env` file at the root of the project by using the `.env.template` file as a template. 

[Get your gecko api key here](https://docs.coingecko.com/v3.0.1/reference/setting-up-your-api-key)


### Using Docker compose
The app includes Docker compose files for prod like and dev mode environment

You need to have :

1. [Docker](https://www.docker.com/products/docker-desktop/)
2. [Docker compose](https://docs.docker.com/compose/install/)

installed before following these instructions.

Make sure [Docker](https://www.docker.com/products/docker-desktop/) engine is running\
on your system and Docker client is accessible from your command line

### Run in dev mode
To run the app in a development environment: 
- at the root of the project run:
```bash
docker compose up -d
```
Visit `localhost:3000` to view the app.


### Run in a prod like environment
To run in a production like environment: 
- at the root of the project run:
```bash
docker compose -f compose.yaml -f compose.prod.yaml up -d
```
Visit `localhost` to view the app.

**Note**: You should change the nginx config file by adding more configs;\
for example a config to run your website with [HTTPS](https://wiki.alpinelinux.org/wiki/Nginx_as_reverse_proxy_with_acme_(letsencrypt)) support,\ 
changing the `server_name` nginx directive, etc.

Take a look at the: 
- nginx docker image [here](https://hub.docker.com/_/nginx)
- nginx documentation [here](nginx.org/en/docs/beginners_guide.html)


### By setting up the dev environment
To run this app locally make sure you have the following prerequisites on your system:
- [Node.js](https://nodejs.org/en/download/current), this include `npm` (Node Package Manager) will be use to run the app. 


#### Install dependencies and run the app
In your terminal :
- Navigate to the new directory created by running:
```bash
  cd figma-to-code-ed2-week3
```
- install the necessary packages by running this command:
```bash
  npm install
```
- once the installation is completed start the app with:
```bash
  npm run dev
```
  
And you're done! visit `localhost:3000` to view the app.
