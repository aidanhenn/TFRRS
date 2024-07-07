# Track-And-Field-Team-Score-Predictor

## 🏃 What was my motivation?

My motivation for building this project was to save time for myself, my teammates, and my coaches. 
I noticed that manually adding up team scores for track and field events took a lot of effort and could 
sometimes lead to discrepancies. By automating this process, I wanted to make it more efficient and accurate.

<img width="958" alt="TFRRS_Scored" src="https://user-images.githubusercontent.com/67212189/231927839-88c30f48-6e22-48e8-a315-ae6db09cfbaa.png">

## ❓ What problem does my project solve?

My project solves the problem of having to manually calculating team scores for track and field events. 
This is a common challenge that many teams face, and my app makes it easier to get accurate scores in less time. 
By using web scraping and an algorithm to predict team performance based on previous results, I can quickly and 
easily determine which teams are likely to win, which saves time and effort for everyone involved.

## 🥇 Tech stack + more

For this project, I used JavaScript, Node.js, and Express.js to build the app and Puppeteer for web scraping. The goal was to make the app easy to use, where the user simply inputs the URL of the conference they want to score. Also, I wanted my algorithm to work for any conference, allowing teams from anywhere to get accurate score predictions. This project taught me a lot about full-stack web development, including front-end and back-end development, web scraping, and algorithms.

# How to use the app:

## 1.) First go the the website https://www.tfrrs.org/

<img width="956" alt="TFRRS_Website" src="https://user-images.githubusercontent.com/67212189/231929230-a4ed35e0-5d55-4e12-96ee-a22f68ec9e4c.png">

## 2.) Select the dropdown menu that says 'Conferences' and search the conference you wish to score. It will bring you to a page similar this:

<img width="954" alt="TFRRS_Big12_Conf" src="https://user-images.githubusercontent.com/67212189/231931345-8b8f8718-7f42-4e22-b604-ee9f84d293cf.png">

## 3.) Click the "View Performance List" button. It will bring you to a page similar to this:

<img width="952" alt="TFRRS_Big12_Conf_Perf_List" src="https://user-images.githubusercontent.com/67212189/231929785-97e9e09f-a2e3-4c0c-a742-cc9116fd6511.png">

## 4.) Copy the URL of the page you are on and paste it into the input field in the app. Ex: https://www.tfrrs.org/lists/4231/Big_12_Outdoor_Performance_List

<img width="959" alt="TFRRS_App_URL" src="https://user-images.githubusercontent.com/67212189/231930456-d26e88d4-980c-4c3f-918f-c9a4948b62c8.png">

## 5.) Click the "Submit" button once you have pasted in a URL and wait for the scores to load. A table will be created that looks similar to this:

<img width="958" alt="TFRRS_Scored" src="https://user-images.githubusercontent.com/67212189/231930680-0e69789d-20d5-45fd-abd1-6d9d77578489.png">
