const calcTime = (timestamp) => {
  const curTime = new Date().getTime();
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute} 분 전}`;
  else if (second > 0) return `${second} 초 전}`;
};

const renderData = (data) => {
  const main = document.querySelector("main");

  data.reverse().forEach(async (obj) => {
    const div = document.createElement("div");
    div.className = "items-list";

    const imgDiv = document.createElement("div");
    imgDiv.className = "items-list__img";

    const img = document.createElement("img");
    const res = await fetch(`images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const InfoDiv = document.createElement("div");
    InfoDiv.className = "items-list__info";

    const InfoTitleDiv = document.createElement("div");
    InfoTitleDiv.className = "items-list__info-title";
    InfoTitleDiv.innerText = obj.title;

    const InfoMetaDiv = document.createElement("div");
    InfoMetaDiv.className = "items-list__info-meta";
    InfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

    const InfoPriceDiv = document.createElement("div");
    InfoPriceDiv.className = "items-list_info-price";
    InfoPriceDiv.innerText = obj.price;

    imgDiv.appendChild(img); // 이미지 상자에 이미지 넣기

    InfoDiv.appendChild(InfoTitleDiv); // 정보 상자에 제목 넣기
    InfoDiv.appendChild(InfoMetaDiv); // 정보 상자에 메타 넣기
    InfoDiv.appendChild(InfoPriceDiv); // 정보 상자에 가격 넣기

    div.appendChild(imgDiv); // 전체 상자에 이미지 먼저 넣기 ✅
    div.appendChild(InfoDiv); // 전체 상자에 정보 나중에 넣기 ✅

    main.appendChild(div);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  console.log(data);
  renderData(data);
};

fetchList();
