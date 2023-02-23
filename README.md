# 🌊 **Calm Wave - WebRTC 기반 업무 관리 및 자세 교정 서비스**

![reallogo](https://user-images.githubusercontent.com/52191425/220856785-3b80f676-b7e5-4a4e-ae6d-d264d2324e27.png)
![main](https://user-images.githubusercontent.com/52191425/220856552-e17f7172-0c63-4cd0-afbe-ee8057dddd91.gif)

- 오래 앉아서 일하는 사람들을 위한 업무 시간 관리 및 자세 교정 서비스
- 무자각성을 지향하는 Calm Tech로 유저의 생활에 조용히 스며들어 도움을 줍니다.
- 사용자의 업무 태도 및 습관을 WebRTC 기술을 이용해 수집 후 분석하여,
  더 나은 업무를 위한 개인화된 솔루션을 제공합니다.
- 사용자의 자세를 교정하고 일정 시간마다 스트레칭을 권유하는 등 개인의 업무환경에 도움을 줍니다.

<br>

## 🎬 **Calm Wave 시연 영상**

[<img src="https://img.shields.io/badge/Link-0085DE?style=for-the-badge&logo=YouTube&logoColor=white">](https://drive.google.com/file/d/16C9Lg_xMNVv9vWsGIXMjhe2ciYe5wq5c/view?usp=sharing)


<br>

## 📅 **프로젝트 진행 기간**

2023/01/09(월) ~ 2023/02/17(금) <br>
SSAFY 8기 2학기 공통프로젝트

<br>

## **Calm Wave 서비스 화면**

### **기능**

[사진]

<br>

## **아키텍처**

...

<br>

## **기술 스택**

### **📚Front**

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
<br>

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<br>


<br>

### **Back**

<img src="https://img.shields.io/badge/java 11-FF0000?style=for-the-badge&logo=OpenJDK&logoColor=white"> 
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
<img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=apachetomcat&logoColor=white">
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white">
<br>
<img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
<img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white">


<br>

### **기타**

<img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> 
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<br>

## **협업 툴**
<img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=git&logoColor=white">

<br>

## **프로젝트 파일 구조**

### **Frontend**

...

### **Backend**

...

<br>

## **프로젝트 산출물**

...

<br>

## **Git 커밋 메시지 컨벤션**

- `Feat` : 새로운 기능 추가
- `Modify` : 기존 기능 수정
- `Fix` : 버그 수정
- `Docs` : 문서 내용 변경
- `Style` : 포맷, 세미콜론 수정 등 코드가 아닌 스타일에 관련된 수정
- `Refactor` : 코드 리팩토링
- `Test`: 테스트 코드 추가 및 리팩토링 테스트 등
- `Build` : 빌드 관련 파일 수정
- `Chore` : 코드 의미에 영향을 주지 않는 변경사항 (포맷, 세미콜론 누락, 공백 등)
- `CI` : CI 관련 설정 수정에 대한 커밋
- 커밋 타입은 **대문자**로 시작하며, 항상 대괄호 안에 파트를 입력하여 시작
- 관련된 지라 이슈 번호에 괄호를 붙여 뒤에 추가.

ex) **[BE] Feat: 관심지역 알림 ON/OFF 기능 추가(#123)**

<br>

## **Git 브랜치 컨벤션**

![git_strategy](https://user-images.githubusercontent.com/52191425/212794379-54373f74-67f6-4ec9-ace0-723e8de33c31.png)

- `main`
    - 배포 가능한 상태의 결과물 올리는 브랜치
- `develop`
    - 구현 완료된 기능을 병합하기 위한 브랜치
    - 통합 폴더의 기능
- `feature`
    - 개별 기능 구현 브랜치
    - 기능 개발 완료 시 삭제
    - 네이밍 규칙
        - feature/FE or BE/기능이름
        - 예) feature/FE/login
          <br><br>
- **feature 브랜치가 완성되면 develop 브랜치로 merge request를 통해 merge한다.**<br>
  ⇒ merge request가 요청되면, 모든 팀원들이 코드 리뷰를 하여 안전하게 merge한다.

<br>

## **팀원 역할 분배**

### **Frontend**

- 윤서용
- 조한이
- 한기현

### **Backend**

- 남이랑
- 양주연
