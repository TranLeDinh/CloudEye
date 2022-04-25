
'''########### Making single predictions ###########'''
import numpy as np
import os
import PIL
import tensorflow as tf
import cv2
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential
from keras.preprocessing import image
from keras.models import load_model
def test(train_path,test_path):
        TrainingImagePath=train_path
 
        from keras.preprocessing.image import ImageDataGenerator

        classifier=load_model('keras_model.h5') 

        train_datagen = ImageDataGenerator(
        shear_range=0.1,
        zoom_range=0.1,
        horizontal_flip=True)
 

        test_datagen = ImageDataGenerator()
 
# Generating the Training Data
        training_set = train_datagen.flow_from_directory(
        TrainingImagePath,
        target_size=(64, 64),
        batch_size=32,
        class_mode='categorical')
 
 
# Generating the Testing Data
        test_set = test_datagen.flow_from_directory(
        TrainingImagePath,
        target_size=(64, 64),
        batch_size=32,
        class_mode='categorical')
 

        test_set.class_indices


        TrainClasses=training_set.class_indices
 


        ResultMap={}
        for faceValue,faceName in zip(TrainClasses.values(),TrainClasses.keys()):
                ResultMap[faceValue]=faceName

        print("Mapping of Face and its ID",ResultMap)
 
        OutputNeurons=len(ResultMap)
        ImagePath=test_path
        
        
        
        list=os.listdir(ImagePath)
        print(list)
        for i in list:
                if i != ".DS_Store":
                        ImagePath2=ImagePath+"/"+i
                        test_image=image.load_img(ImagePath2,target_size=(64, 64))
                        test_image=image.img_to_array(test_image)
 
                        test_image=np.expand_dims(test_image,axis=0)
                        result=classifier.predict(test_image,verbose=0)

                        print(100*result[0])
                        p=100*max(result[0])
                        if p>96.5:
                                return ResultMap[np.argmax(result)]
                        else:
                                return "Nguoi la"
        
        
        
        
        
        
