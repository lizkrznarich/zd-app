# Zendesk NASA Astronomy Picture of the Day (APOD) App

This Zendesk app displays the [NASA Astronomy Picture of the Day (APOD)](https://apod.nasa.gov/apod/astropix.html) in the ticket sidebar.

## Installation

1. Download the packaged app from [/tmp/app-20190915190322.zip](https://github.com/lizkrznarich/zd-app/blob/master/tmp/app-20190915190322.zip)
2. Upload and install the app into your Zendesk instance as directed in [Uploading and installing a private app](https://develop.zendesk.com/hc/en-us/articles/360001069347-Uploading-and-installing-a-private-app)

## Usage

1. Open any ticket, ex: https://yourinstance.zendesk.com/agent/tickets/1
2. Click the Apps button in the upper right corner of the ticket view and click Refresh
![Zendesk ticket app button](https://github.com/lizkrznarich/zd-app/blob/master/img/apps-button.png)

3. By default, the most recent photo will appear
![APOD default widget](https://github.com/lizkrznarich/zd-app/blob/master/img/apod-widget-default.png)

4. To see a different photo, choose a date using the date picker beneath the photo thumbnail
![APOD widget date picker](https://github.com/lizkrznarich/zd-app/blob/master/img/date-picker.png)

5. Click the photo thumbnail to open a larger view in a modal
![APOD widget modal](https://github.com/lizkrznarich/zd-app/blob/master/img/modal.png)

### Notes: 
- Some APODs are Youtube videos! To see an example, choose Sept 3, 2019 in the datepicker
- APOD doesn't tell us what timezone they're using, or what time a new photo is uploaded each day, so the photo for the user's current day may not be available yet. In that case, the most recent photo is displayed.


