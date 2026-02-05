const handleSubmitForm = async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  formData.append("insertAt", new Date().getTime());

  try {
    const res = await fetch("/items", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorDetail = await res.json();
      console.log("에러 상세 정보:", errorDetail);
      return;
    }

    const data = await res.json();
    if (data === "200") {
      window.location.pathname = "/";
    }
  } catch (e) {
    console.error("연결 에러:", e);
  }
};

const form = document.getElementById("write-form");
form.addEventListener("submit", handleSubmitForm);
