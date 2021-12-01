# [In*sight*ful Saliency Maps](https://cmu-vis-2021.github.io/Human-vs-Machine-Final-Project/)

![image](https://user-images.githubusercontent.com/11639631/144311494-b55e5484-511e-4431-88f0-f17e29aa718f.png)



### Project Abstract:

*Explainability techniques for image classification such as saliency maps provide insight into which regions of the image influenced the prediction. Saliency techniques can assist data scientists in model debugging by identifying features in images that are not relevant to the image class. However, the static presentation of saliency maps withhold data scientists from further exploring model behavior on out-of-distribution data. Incorporating saliency maps in an interactive tool will enable data scientists to debug their models while understanding how their model behaves on out-of-distribution data. We present a protoype that incorporates saliency maps in an interactive, exploratory tool to showcase novel interactions that data scientists can experience with saliency maps.*

### Project Report: [PDF](https://github.com/CMU-Vis-2021/Human-vs-Machine-Final-Project/blob/main/assets/Data_Viz_Final_Project_Report.pdf)

### Project Demo Video: [Video](https://drive.google.com/file/d/1WWqxBAzHl1Pm0M4TO6azJ3AZ4hh2PBjM/view?usp=sharing)

---

## Stylized-Images, Predictions, and Saliency Maps Source Code

* View this [Google Colab](https://colab.research.google.com/drive/1deRnUMs7LLns5awMicJgBJ8UFTqvz5e6?usp=sharing) to see how we generated the saliency maps.
* View this [Google Colab](https://colab.research.google.com/drive/1X-Fk6anwYs4SDcfnIAdZBxUzoofwvNBt?usp=sharing) to see how we approximated image similarity.
* View this [Google Colab](https://colab.research.google.com/drive/1lyrBrbl-XCa1BlVc_fcLzO1v5DKPooeu?usp=sharing) to see how we approximated the top-K colors in an image.
* View this [Google Colab](https://colab.research.google.com/drive/1zk0uOHnn9mV41CBGIOj6xRK5rb26Vvvz?usp=sharing) to see how we generated stylized images.
* View this [Google Colab](https://colab.research.google.com/drive/1khWyR4UrNW6KL6VH2lrARrI6BFDTVWi0?usp=sharing) to see how we predicted the class of the stylized images.


## Running this repo locally
0. Make sure you have `npm` on your computer. If you don't, you can install it [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
1. Clone this repo
2. In the terminal, navigate to this repo.
3. Run the following commands: 

   3.1. `npm install`
   
   3.2. `npm run start` or `npm run dev` or `npm run`

4. Copy and paste the local host url and open up in a browser.

### Project Development Process:

We leveraged the GitHub projects features to outline features, bugs, and next steps throughout developing our project. You can view our project with a history of our tasks and issues [here](https://github.com/CMU-Vis-2021/Human-vs-Machine-Final-Project/projects/1). 

In terms of work split between the two developers:

Swetha designed and fully implemented the stylize an image tab and explain an image tab. She also managed all of the UI/UX for our site. This includes disbaling certain features under certain conditions, setting the theme of the tabs, and designing the look of the website. 

Katelyn designed and helped implement the Saliency Similiarity tab and the Model comparison tab. Swetha assisted with the UI/UX for these tabs. Katelyn managed all of the machine learning related source code including generating stylized images using neural style transfer, generating the XRAI saliency maps, and the predictions for each image. 

---

## Authors: 
* Swetha Kannan
* Katelyn Morrison

