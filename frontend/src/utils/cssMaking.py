'''
색상 class 명 규칙 : <place>-<type>-<color>-<brightness>
place의 경우, bg와 font, bd 세가지. 각각 배경, 폰트, 테두리. shadow는 나중에..!
ex) bg-cw-indigo-5 클래스를 주면 background가 밝기 흰색 위 밝기 50%의 색상.
txt-wb-nightsky-10 클래스를 주면 글자색이 웨일 브라우저의 밤하늘 색상 그대로. 

cw : {
  skyblue : 하늘색.
  darkblue : 곤색
  indigo : 남색
  grey : 회색
  paleyellow : 연노랑인데 너무 밝아서 지울까 생각중
  yellow : 노랑
}

wb : {
mint : 민트색
brightmint : 밝은 민트색
nightsky : 밤하늘 색
darkblue : 푸른빛 띄는 검은색
}

sys : {
grey : 회색
blue : 파랑
red : 빨강
purple : 보라
}
'''
places = ["bg", "txt", "bd"]
keyval = {
    "cw-skyblue" : {
        10:"#99D6EA",
        9:"#A4DBED",
        8:"#ADDEEE",
        7:"#B8E3F1",
        6:"#C2E6F2",
        5:"#CCEBF5",
        4:"#D6EFF7",
        3:"#E1F3F9",
        2:"#EBF7FB",
        1:"#F5FBFD",
    },
    "cw-darkblue": {
        10:"#6798C0",
        9:"#77A3C7",
        8:"#85ADCD",
        7:"#95B7D3",
        6:"#A4C1D9",
        5:"#B3CCE0",
        4:"#C2D6E6",
        3:"#D2E1ED",
        2:"#E1EAF2",
        1:"#F0F5F9",
    },
    "cw-indigo": {
        10:"#1D58A4",
        9:"#3469AE",
        8:"#4A79B6",
        7:"#618BC0",
        6:"#779BC8",
        5:"#8EACD2",
        4:"#A5BCDB",
        3:"#BCCDE4",
        2:"#D2DEED",
        1:"#E9EFF6",
    },
    "cw-grey": {
        10:"#E6E6E6",
        9:"#E9E9E9",
        8:"#EBEBEB",
        7:"#EEEEEE",
        6:"#F0F0F0",
        5:"#F3F3F3",
        4:"#F5F5F5",
        3:"#F8F8F8",
        2:"#FAFAFA",
        1:"#FDFDFD",
    },
    "cw-paleyellow": {
        10:"#FFFDF7",
        9:"#FFFEF8",
        8:"#FFFDF9",
        7:"#FFFEFA",
        6:"#FFFEFA",
        5:"#FFFEFB",
        4:"#FFFEFC",
        3:"#FFFFFD",
        2:"#FFFFFD",
        1:"#FFFFFF",
    },
    "cw-yellow": {
        10:"#FDD85D",
        9:"#FDE07D",
        8:"#FEDC6E",
        7:"#FEE48E",
        6:"#FEE89E",
        5:"#FEECAE",
        4:"#FEEFBE",
        3:"#FFF4CF",
        2:"#FFF7DF",
        1:"#FFFCEF",
    },
    "wb-mint": {
        10:"#4CE6B8",
        9:"#5EE9C0",
        8:"#70EBC6",
        7:"#82EECE",
        6:"#94F0D4",
        5:"#A6F3DC",
        4:"#B7F5E3",
        3:"#CAF8EA",
        2:"#DBFAF1",
        1:"#EEFDF8",
    },
    "wb-brightmint": {
        10:"#D2FAF0",
        9:"#D7FBF2",
        8:"#DBFBF3",
        7:"#E0FCF5",
        6:"#E4FCF6",
        5:"#E9FDF8",
        4:"#EDFDF9",
        3:"#F2FEFB",
        2:"#F6FEFC",
        1:"#FBFFFE",
    },
    "wb-nightsky": {
        10:"#071F56",
        9:"#203667",
        8:"#394C78",
        7:"#526389",
        6:"#6A799A",
        5:"#838FAB",
        4:"#9CA5BB",
        3:"#B5BCCD",
        2:"#CDD2DD",
        1:"#E7E9EF",
    },
    "wb-darkblue": {
        10:"#03103C",
        9:"#1D2850",
        8:"#354063",
        7:"#4F5877",
        6:"#68708A",
        5:"#81889E",
        4:"#9A9FB1",
        3:"#B4B8C5",
        2:"#CDCFD8",
        1:"#E6E8EC",
    },
    "sys-grey": {
        10:"#443E3E",
        9:"#585252",
        8:"#6D6767",
        7:"#817C7C",
        6:"#969292",
        5:"#AAA9A9",
        4:"#BEBEBE",
        3:"#D3D3D3",
        2:"#F4F4F4",
        1:"#FCFCFC",
    },
    "sys-blue": {
        10:"#00324E",
        9:"#004C77",
        8:"#0066A0",
        7:"#0080C8",
        6:"#049CF1",
        5:"#31B5FF",
        4:"#5EC5FF",
        3:"#8BD5FF",
        2:"#B9E5FF",
        1:"#E6F6FF",
    },
    "sys-red": {
        10:"#5D0001",
        9:"#7F0002",
        8:"#A10709",
        7:"#C31417",
        6:"#E52528",
        5:"#FF383B",
        4:"#FF6567",
        3:"#FF9193",
        2:"#FFBEBF",
        1:"#FFEBEB",
    },
    "sys-purple": {
        10:"#210D5A",
        9:"#32187C",
        8:"#46279E",
        7:"#5D3AC0",
        6:"#7650E2",
        5:"#8F68FF",
        4:"#A88AFF",
        3:"#C1ACFF",
        2:"#DACEFF",
        1:"#F4F0FF",
    },
}

output = []
for typcol in keyval:
    for bright in keyval[typcol]:
        cssval = keyval[typcol][bright]
        for place in places:
            className = f".{place}-{typcol}-{bright} "
            if place == "bg":
                csskey = "background-color"
            elif place == "txt":
                csskey = "color"
            elif place == "bd":
                csskey = "border-color"
            classDetail = className + "{" + "\n  " + f"{csskey}: {cssval}" + "\n}"
            output.append(classDetail)

with open("./AdditionalCSS.css", 'w', encoding="utf-8") as file:
    for i in output:
        file.write(i)
        file.write("\n")



