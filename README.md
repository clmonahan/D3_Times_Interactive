# Dynamic Poverty Chart

## Goal
Create a dynamic, interactive chart that uses a variety of data from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System to look for correlations between health risk factors.

## Data Sources
* 2014 ACS 1-year estimates: https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml

## Method
This project used JavaScript, HTML, CSS & Bootstrap, and the D3.js library. 
* JS code: https://github.com/clmonahan/dynamic-poverty-chart/blob/master/D3_Times/assets/js/app.js
* HTML code: https://github.com/clmonahan/dynamic-poverty-chart/blob/master/D3_Times/index.html
* CSV file: https://github.com/clmonahan/dynamic-poverty-chart/blob/master/D3_Times/assets/data.csv
* CSS files: https://github.com/clmonahan/dynamic-poverty-chart/tree/master/D3_Times/assets/css

## Procedures
1. Import CSV files
2. Create basic bubble graph using D3 and label the bubbles with the abbreviation of the state that is represented by each bubble. 
3. Include data from 6 variables, 3 per axis
4. Add tooltips popups with the individual data for each state based on the selected input for each axis

## Final State
The graph should be interactive so that the user may select any of the three variables on the x-axis as well as any of the 3 variables on the y-axis and have the entire graph update based on those inputs.

## Challenges
* The most difficult part of this project was getting the 6 variables to interact with one another, an issue that was ultimately overcome with patience and persistence. 
* At a lower level, the data needed some cleaning up before it could be used successfully.

## Conclusions
There appears to be a negative correlation between poverty levels the percentage of the population with healthcare coverage. 
It also appears that people living in states with lower income levels are more likely to be obese and to smoke. 
<br>
States with a younger population have lower rates of smokers, which is not surprising given that there is a nationwide ban on smoking under the age of 18. 
Similarly, states with a young population are less likely to have high rates of healthcare coverage given that many states provide healthcare to adults above a certain age.
These two correlations show how impactful government regulations can be on the well-being of citizens.
<br>
The relationship between age and obesity is less clear, and it is possible that states with obese adults are more likely to also be states with obese children. 
