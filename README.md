                                                                               **Diabetes Heatmap Dashboard**

This dashboard creates a visualization of Blood-Glucose levels and BloodPressure levels of 30 of diabetes patients treated by hospital in the US From the 1st of January 2023 to the 30th of January 2023  . It establishes a visual representation of the relationship between both conditions, i.e High blood-glucose and High Blood-Pressure.  The visualization in this Dashboard are in a form of heatmap that goes ahead to show individual visualization of the health and demographic information of a patient when their heatmap bar is clicked. The Patient data used in this dashboard was a csv data generated from https://www.kaggle.com/datasets/diabetes-dataset and converted to json and then to FHIR bundles which is streamable on test_fhir.py. flask, d3.js, javascript, html and css were used to create a relateable and conspicuous heatmap of bars that exhibit different colors and color-intensity with regards to Glucose/Blood-Pressure and their diffrent levels respectively. Patient name can also be searched in the searchbox to get more information about the Patient, just like clicking the heatmap bar.


**Target User Groups**
The target user here are the doctors and other medical professionals who are part of the co-ordinated care in Diabetes and High Blood-Pressure treatment.

**The Problem**
The complications of Diabetes is such that somany comobidities associated with it are overlooked, whereby these correlated ailments facilitate its debility or mortality. One such correlated mobidities is High Blood-Pressure. It is well known that cadiovascular ailments like High Blood-Pressure are the major cause of mortality in people with Diabetes. Also, there is an assumption that there is a positive corellation between High Blood-glucose and High or Low Blood Pressure. A lot of studies cite insulin use as a major cause of High Blood-Pressure, mainly few months into treatment of Diabetes. Nevertheless, Blood-Pressure levels start lowering significantly months into insulin use. This can also present great danger of low Blood-Pressure. Another study by Sylvi Persson "Bload Pressure reactions to insulin treatment in patients with type 2 diabetes", PubMed Central, 2007 suggests that Blood-Pressure also affects how the body tissues absorb Glucose because it alters how the skeletal muscles utilize insulin to absorb Glucose. These trends have been grossly overlooked in treatment of patients with Diabetes or High BloodPressure leading to numerous mortality.

**Solution**
This Dashboard aims to simplify monitoring and treatment of peaople with Diabetes and also people with High Blod-Pressure. It also improves co-ordinated care in these two morbidities and other corellated morbidities. Most importantly it enhances efficiency in acute and chronic care of these two mobidities. It provides the Medical Practisioner a conspicious view of the Patient's Blood-sugar and Blood-Pressure diastolic readings at all times, even without the Medical practisioner's request. The problem of treating one ailment while a postively correlated condition worsens will be highly mitigated. With the difference in the heatmap bar color and color intensity, the Medical Practisioner can easily visualize dangerious levels of each condition. High level of Blood-Pressure is represented by High color intensity of red and Low Blood-Pressure is represented by low color intensity of red. The same applies to the Blood-Glucose. High color intensity of Blue signifies High Blood-Glucose while lighter shade of blue signifies low Blood-sugar. Chances of oversight will be very minimal.

**User Aims and Objective**
(1) To get a clear overall view of the Blood-Glucose and Blood-Levels of every patient in the Physician's care.
(2) To get a closer and individual view of a particular patient in care.
(3) To avoid oversight of co-mobidities that can be very insidious.
(4) To Facilitate care for Diabetes and hypertensive patients.
(5) To make care for Diabetes and hypertensive patients more effective.
(6) Overall, to study more the correlation of two mobidities and the way one aggravates the other.

**Features**
Frontpage(searchbox, Entire chart, Clickable bars)
Backpage(Searchbox, Individual clickable bars, Patient's details including Patient's image)

**User guide**
Blue legend: Represents Blood Glucose
Red legend: Represents Blood-Pressure
High intensity blue color Bars signify High blood Glucose(Danger)
High intensity red color Bars signify High Blood-Pressure(Danger)
Low intensity blue bars signify low Blood Glucose(More Danger)
Low intensity red bars signify low Blood-Pressure(More Danger)

**How to use**
(1) Clone from this Github repository
(2) Run it on Github Codespaces
(3) Visualize every Data/information


