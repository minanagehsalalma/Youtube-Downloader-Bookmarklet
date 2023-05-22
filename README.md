# Youtube-Downloader-Bookmarklet
A Javascript Bookmarklet That creates a menu for downloading YT Vids without needing any third party app nor site.

How It works 

1. The code is ought to extract links from the youtube video source code 
The download look like this 
```
https://rr2---sn-p5qlsnrr.googlevideo.com/videoplayback?expire=1684468489\u0026ei=qZ5mZN7BNMKK8wS1_oPwAQ\u0026ip=5.161.183.140\u0026id=o-AJuy0sBEqnpSzwaxTvnIu073VR0LXVtqdliiv_1OFgf9\u0026itag=133\u0026aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278\u0026source=youtube\u0026requiressl=yes\u0026mh=rN\u0026mm=31%2C29\u0026mn=sn-p5qlsnrr%2Csn-p5qs7nsk\u0026ms=au%2Crdu\u0026mv=m\u0026mvi=2\u0026pl=25\u0026initcwndbps=228750\u0026vprv=1\u0026svpuc=1\u0026mime=video%2Fmp4\u0026ns=K3Z9gDwnP7LVoVPaftnIDXYN\u0026gir=yes\u0026clen=15402279\u0026dur=858.840\u0026lmt=1684426280879666\u0026mt=1684446550\u0026fvip=2\u0026keepalive=yes\u0026fexp=24007246\u0026c=WEB\u0026txp=6319224\u0026n=71Y3gTJ9yPp1DNi2Kb\u0026sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt\u0026sig=AOq0QJ8wRAIgaf5d6vVdJEd4bfxpyTZIpX94BNLZJj2NxqsCF8o5xwACIH5_shJUMe1LiCm4gbX4w9cxDP1doWUCTDkvz-HCtJ-k\u0026lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps\u0026lsig=AG3C_xAwRQIgFgL1GSHAIL3dDefp4zeDWQ5Y2YYpXQx7oILBvaqvxa0CIQDSrlTcbeUqwKT859PtJ-Wa1DXspKM1auWPvRCd_xFdSA%3D%3D
```

2. The highlight to distinguish these links from the others is "videoplayback?expire"
so there shall be a regex to extract all urls that contain that.

3. to specify the video quality/format we use the itag parameter from the link. we know that the
itag parameter with value "22" stands for 720 mp4 ...etc [the full list](https://gist.github.com/sidneys/7095afe4da4ae58694d128b1034e01e2)

4. for the urls to work you need to replace  "\u0026" with "&" and decode / Escape any encoded bits

5. The bookmarklet **Prompt Version** should show a prompt that allows the user to select from the available formats while the **WithMenu** injects a menu into the current video code

Side Note : to make the downloaded files have the vid name we added a [title parameter](https://github.com/ytdl-org/youtube-dl/issues/13325#issuecomment-308330358) to the url with the vid name extracted using the tab title
