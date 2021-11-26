function intersection(){
	var correct = 0, total = 0;

	
	// stylized image
	document.getElementById("stylized-img-ss").style.height = "100%"
	console.log(document.getElementById("stylized-img-ss").style)

	let first_img = cv.imread(document.getElementById("stylized-img-ss"))
  	let first_dst = new cv.Mat(); 

  	cv.cvtColor(first_img, first_dst, cv.COLOR_RGBA2RGB);


  	// original image
	// let first_img_og = cv.imread(document.getElementById("original-img-ss"))
 //  	let first_dst_og = new cv.Mat(); 

 //  	cv.cvtColor(first_img_og, first_dst_og, cv.COLOR_RGBA2RGB);

  	console.log(first_img_og['rows'])

	// for(var i =0; i < ; i++){

	// }

}

    
    // for i in range(width):
    //     for j in range(height):
    //         min0 = imageA[i][j][0] - alpha
    //         max0 = imageA[i][j][0] + alpha

    //         min1 = imageA[i][j][1] - alpha
    //         max1 = imageA[i][j][1] + alpha

    //         min2 = imageA[i][j][2] - alpha
    //         max2 = imageA[i][j][2] + alpha
            
    //         if intersection: 
    //             if imageB[i][j][0] >= min0 and imageB[i][j][0] <= max0:
                    
    //                 if imageB[i][j][1] >= min1 and imageB[i][j][1] <= max1:
                        
    //                     if imageB[i][j][2] >= min2 and imageB[i][j][2] <= max2:
                            
    //                         correct +=1
    //                         dif_img[i][j][0] = imageB[i][j][0]
    //                         dif_img[i][j][1] = imageB[i][j][1]
    //                         dif_img[i][j][2] = imageB[i][j][2]
    //         # else: #compute difference
    //         #     if imageB[i][j][0] > max0 or imageB[i][j][0] < min0:
    //         #         if imageB[i][j][1] > max1 or imageB[i][j][1] < min1:
    //         #             if imageB[i][j][2] > max2 or imageB[i][j][2] < min2:
    //         #                 incorrect +=1
    //         #                 dif_img[i][j][0] = imageB[i][j][0]
    //         #                 dif_img[i][j][1] = imageB[i][j][1]
    //         #                 dif_img[i][j][2] = imageB[i][j][2]
    //         total += 1
            
    // if intersection:
    //     print(correct)
    //     perc = (correct/total)*100
    // else:
    //     print(incorrect)
    //     perc = (incorrect/total)*100
    // print(total)
    // return dif_img, perc