# In*sight*ful Saliency Maps
*Final Project*

Authors: 
* Swetha Kannan
* Katelyn Morrison
---

![image](https://user-images.githubusercontent.com/7442274/144310232-54239047-3ba1-44df-a7a8-ee4ec343bd39.png)


Project Abstract:

*Explainability techniques for image classification such as saliency maps provide insight into which regions of the image influenced the prediction. Saliency techniques can assist data scientists in model debugging by identifying features in images that are not relevant to the image class. However, the static presentation of saliency maps withhold data scientists from further exploring model behavior on out-of-distribution data. Incorporating saliency maps in an interactive tool will enable data scientists to debug their models while understanding how their model behaves on out-of-distribution data. We present a protoype that incorporates saliency maps in an interactive, exploratory tool to showcase novel interactions that data scientists can experience with saliency maps.*

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
