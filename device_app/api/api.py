from dataclasses import field
from datetime import datetime
from email.quoprimime import body_check
import imp
from operator import iadd
from tkinter import Variable
from turtle import title
from unittest import result
from flask import Flask, jsonify, request, redirect, url_for, flash

from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import null

from werkzeug.utils import secure_filename

from test import test as tmtest
from train import fulltrain as tmtrain

from post import post

import os.path
import os
import json

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/cloudeye'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_RECFOLDER'] = 'D:/dataset/recognize'
app.config['UPLOAD_ADDFOLDER'] = 'D:/dataset/add/'


addid = 0
recid = 0


@app.route('/test')
def test():    
    train_path=app.config['UPLOAD_RECFOLDER']
    image_path=folder
    
    re = tmtest(train_path,image_path)
    
    print(re['return'])
    if re['return'] != "Nguoi la":
        post(2)
    else:
        post(3)
    return jsonify(re)


@app.route('/train')
def train():
    train_path=app.config['UPLOAD_ADDFOLDER']
    tmtrain(train_path)
    return ''

@app.route('/recognize', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            #flash('No file part')
            return redirect(request.url)
        
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            #flash('No selected file')
            return redirect(request.url)
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(folder, filename))
                        
            return redirect(url_for('upload_file', name=filename))
    return ''

@app.route('/add', methods=['GET', 'POST'])
def upload_addfile():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            #flash('No file part')
            return redirect(request.url)
        
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            #flash('No selected file')
            return redirect(request.url)
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(folder, filename))
                        
            return redirect(url_for('upload_addfile', name=filename))
    return ''


@app.route('/addfolder')
def add_addfolder():
    global addid
    foldername = 'add'+ str(addid)+'/'
    addid += 1
    global folder
    folder = os.path.join(app.config['UPLOAD_ADDFOLDER'], foldername)
    if not os.path.exists(folder):        
        os.makedirs(folder)
    return ''

@app.route('/recfolder')
def add_recfolder():    
    global recid
    foldername = 'rec'+ str(recid)+'/'
    recid += 1
    global folder
    folder = os.path.join(app.config['UPLOAD_RECFOLDER'], foldername)
    if not os.path.exists(folder):        
        os.makedirs(folder)
    return ''

if __name__ == "__main__":
    app.run(host = '0.0.0.0', port=8081, debug=True)
