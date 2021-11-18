#!/usr/bin/env python3
import subprocess
import re
import glob
import os
import shutil
import markdown
from bs4 import BeautifulSoup
from sys import platform


def md_to_text(md):
    html = markdown.markdown(md)
    soup = BeautifulSoup(html, features='html.parser')
    return soup.get_text()



if platform == "linux" or platform == "linux2":

    Core_Matches = ["starter", "beginner", "easy"]
    Intermediate_Matches = ["middle", "average", "medium"]
    Advanced_Matches = ["end", "difficult", "hard"]
    ML_Matches = ["deep learning","machine learning","deep_learning","deep-learning","machine_learning","machine-learning"]
    Software_Carpentry_Matches = ["software data carpentry"]

    current_path = (os.path.dirname(os.path.realpath(__file__)))

    #Bash
    # Download the URL then strip to the folder you want.
    #https://codeload.github.com/[owner]/[repo]/tar.gz/master | \ tar -xz --strip=2 [repo]-master/[folder_path]
    # Un/recomment and use or download the markdown manually into a folder called events in the same directory as this script.

    #"""
    owner = "RSE-Sheffield"
    repo =  "RSE-Sheffield.github.io"
    print(current_path)
    events_path = current_path + "/events"
    print(events_path)
    shutil.rmtree(events_path , ignore_errors=True)
    os.makedirs(events_path)
    curl = " curl https://codeload.github.com/" + owner + "/" + repo +"/tar.gz/master"
    untarcmd = " | tar -C events -xz --strip=2 " + repo + "-master/_events"

    bashCommand = curl + untarcmd
    output = subprocess.check_output(['bash','-c', bashCommand])
    #"""

    out_folder = "parsed_files" 
    shutil.rmtree(current_path + "/" + out_folder, ignore_errors=True)
    os.makedirs(current_path + "/" + out_folder)
    files = glob.glob(current_path + "/events/*.md" )

    for name in files: 
        try:
            with open(name) as f:
                content = re.search('(---)((.|\n)*)(---)((.|\n)*)',f.read())                                        # Grab content between the two triple dashes.
                md = md_to_text(content.group(5))                                                                   # This is not stripped of newlines yet for parsing in line 50.
                title = (str(', '.join(re.findall("title: (.*)",str(content.group(2)))))).replace("\"","")          # Each category is regex matched from the content grabbed in line 45 where possible.
                category = str(', '.join(re.findall("category: (.*)",str(content.group(2)))))
                tags = str(', '.join(re.findall("tags: (.*)",str(content.group(2)))))
                date = str(', '.join(re.findall("date: (.*)",str(content.group(2)))))
                permalink_regex = str(', '.join(re.findall("permalink: (.*)",str(content.group(2)))))
                contentlevel_regex = re.findall("Content level: (.*?)\n",str(md))                                   # This is grabbed from md like this to avoid issues with order of parsing and newlines.
                                                                                                                    # The new lines are removed when the full link is constructed below in line 67.
                if contentlevel_regex:
                    contentlevel = contentlevel_regex[0]
                    if any (x in contentlevel_regex[0] for x in Core_Matches):
                        contentlevel = "Core"
                    elif any (x in contentlevel_regex[0] for x in Intermediate_Matches):
                        contentlevel = "Intermediate"
                    elif any (x in contentlevel_regex[0] for x in Advanced_Matches):
                        contentlevel = "Advanced"
                else:
                    contentlevel = "unknown"
                
                if permalink_regex:                                                                                 # Not all events have a permalink.
                    permalink = "https://rse.shef.ac.uk" + permalink_regex                                          # The RSE website is hosted on this alternate DNS name.
                else:
                    permalink = ""

                topic_list = []
                if tags:
                    if any (x in tags for x in ML_Matches):
                        topic_list.append("ML")
                    elif any (x in tags for x in Software_Carpentry_Matches):
                        topic_list.append("SC")
                    topic = ",".join(topic_list)
                else:
                    topic = "unknown"
                
                #Begin full link construction into YAML.
                link = "- title: \"" + title + "\"\n" + "  description: \" " + md.replace("\n", "") + "\"\n" + "  pageName: training.md" + "\n" + "  level: " + contentlevel + "\n" + "  topic: " + topic + "\n" + "  provider: Sheffield-RSE" + "\n"
                if tags:
                    link = link + "  tags: " + tags + "\n"
                if date:
                    link = link + "  date: " + date + "\n"
                if permalink:
                    link = link + "  url: " + permalink + "\n"
                link = link + "\n"
                #Finish full link construction into YAML.

                #Write out to a file for each category.
                text_file = out_folder + "/" + category + ".yml"
                write_file = open(text_file, "a")
                write_file.write(link)
                write_file.close()


        except IOError as exc:
            if exc.errno != errno.EISDIR: # Do not fail if a directory is found, just ignore it.
                raise # Propagate other kinds of IOError.
    

elif platform == "darwin":
    # OS X
    print("This script only works on linux + bash shell. Exiting.")

elif platform == "win32":
    # Windows...
    print("This script only works on linux + bash shell. Exiting.")