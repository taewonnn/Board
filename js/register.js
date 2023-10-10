// email 중복 확인 함수
async function checkEmailAvailability(email) {
  try {
    const res = await fetch("/include/register.php", {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: "email=" + email + "&check_email=1",
    });

    if (res.ok) {
      const result = await res.json();
      let message = "";

      if (result.status === "available") {
        message = "사용 가능한 아이디입니다.";
        document.getElementById("useEmail").style.display = "inline-block";
      } else if (result.status === "taken") {
        message = "이미 사용 중인 아이디입니다.";
        document.getElementById("useEmail").style.display = "none";
      }

      // 모달창의 메시지 업데이트 후 모달창 표시
      document.getElementById("modal-message").innerText = message;
      const modal = new bootstrap.Modal(
        document.getElementById("idCheckModal")
      );
      modal.show();
    } else {
      throw new Error("서버 오류");
    }
  } catch (err) {
    console.error(err);
  }
}

// email 중복확인 함수 - 사용하기
function useThisEmail() {
  document.getElementById("email").readOnly = true;
  const modalElement = document.getElementById("idCheckModal");
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
}

// 유효성 검사 문구
const validators = {
  username: (value) => {
    return value.length >= 2 &&
      value.length <= 20 &&
      /^[A-Za-z가-힣]+$/.test(value)
      ? ""
      : "이름은 2글자 이상 20글자 이하 한글/영어로 작성해주세요";
  },
  email: (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? ""
      : "올바른 이메일 형식이 아닙니다.";
  },
  password: (value) => {
    return value.length >= 4 && !/\s/.test(value)
      ? ""
      : "비밀번호는 4자리 이상이어야 하며, 공백을 포함할 수 없습니다.";
  },
  passwordConfirm: (value, allValues) => {
    return value === allValues.password ? "" : "비밀번호가 일치하지 않습니다.";
  },
};

// 유효성 검사 함수
function validateField(fieldName, value, allValues) {
  const validator = validators[fieldName];
  const helpText = validator(value, allValues);

  document.getElementById(`${fieldName}Help`).innerText = helpText;

  // 수정된 부분
  if (helpText) {
    document.getElementById(fieldName).classList.add("is-invalid");
    document.getElementById(fieldName).classList.remove("is-valid");
  } else {
    document.getElementById(fieldName).classList.remove("is-invalid");
    document.getElementById(fieldName).classList.add("is-valid");
  }
}

// 유효성 검사 이벤트
document.getElementById("username").addEventListener("input", (event) => {
  validateField("username", event.target.value);
});

document.getElementById("email").addEventListener("input", (event) => {
  validateField("email", event.target.value);
});

document.getElementById("password").addEventListener("input", (event) => {
  validateField("password", event.target.value);
  validateField(
    "passwordConfirm",
    document.getElementById("passwordConfirm").value,
    {
      password: event.target.value,
    }
  );
});

document.getElementById("passwordConfirm").addEventListener("input", (event) => {
    validateField("passwordConfirm", event.target.value, {
      password: document.getElementById("password").value,
    });
  });

document.querySelector('form[name="register"]').addEventListener('submit', function(event) {
    let isValid = true; // 가정: 폼이 유효하다
    const allValues = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        passwordConfirm: document.getElementById("passwordConfirm").value,
    };

    // 각 필드에 대해 유효성 검사를 수행
    for (let fieldName in validators) {
        const validator = validators[fieldName];
        const fieldValue = allValues[fieldName];
        const helpText = validator(fieldValue, allValues);

        if (helpText) {
            isValid = false; // 유효하지 않은 필드가 발견되면, isValid를 false로 설정
            document.getElementById(`${fieldName}Help`).innerText = helpText;
            document.getElementById(fieldName).classList.add("is-invalid");
            document.getElementById(fieldName).classList.remove("is-valid");
        } else {
            document.getElementById(`${fieldName}Help`).innerText = "";
            document.getElementById(fieldName).classList.remove("is-invalid");
            document.getElementById(fieldName).classList.add("is-valid");
        }
    }

    // 만약 유효하지 않은 필드가 있다면, 폼 제출을 막고 알림을 표시
    if (!isValid) {
        event.preventDefault(); // 폼 제출 막기
        alert('입력이 유효하지 않습니다. 다시 확인해 주세요.');
    }
});