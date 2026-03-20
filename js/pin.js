const buttons = document.querySelectorAll('.button');
    const stepMessage = document.getElementById('stepMessage');
    const pinForm = document.getElementById('pinForm');
    const f_ques = document.getElementById('q_m_one');
    const f_star = document.getElementById('s_one');
    const t_ques = document.getElementById('q_m_two');
    const t_star = document.getElementById('s_two');
    const th_ques = document.getElementById('q_m_th');
    const th_star = document.getElementById('s_th');
    const fo_ques = document.getElementById('q_m_f');
    const fo_star = document.getElementById('s_f');


    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const btn4 = document.getElementById('btn4');
    const btn5 = document.getElementById('btn5');
    const btn6 = document.getElementById('btn6');
    const btn7 = document.getElementById('btn7');
    const btn8 = document.getElementById('btn8');
    const btn9 = document.getElementById('btn9');
    const btn10 = document.getElementById('btn10');
   

    const pinInputs = {
      pin1: document.getElementById('pin1'),
      pin2: document.getElementById('pin2'),
      pin3: document.getElementById('pin3'),
      pin4: document.getElementById('pin4')
    };


    let clickCount = 0;
    let numbers = [...Array(10).keys()]; // Generates an array [0, 1, 2, ..., 9]

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
    }

    function updateButtons() {
      shuffle(numbers);
      buttons.forEach((button, index) => {
        button.textContent = numbers[index];
      });
    }

    function updateMessage(message) {
      stepMessage.textContent = message;
    }

    function submitForm() {
      setTimeout(function() {
        pinForm.submit();
      }, 2000); // Wait for 2 seconds before submitting
    }


    function handleClick(event) {
      const clickedButton = event.target;
      const value = clickedButton.textContent;

      if (clickCount === 0) {
        pinInputs.pin1.value = value;
        updateMessage('Now click the second digit');
        btn1.style.textAlign = "left";
        btn2.style.display = "inline-flex";
		btn2.style.alignItems = "flex-start";
        btn3.style.textAlign = "right";
        btn4.style.display = "flex";
        btn4.style.alignItems = "flex-end";
        btn5.style.textAlign = "right";
        btn6.style.textAlign = "left";
        btn7.style.textAlign = "right";
        btn8.style.textAlign = "left";
        btn9.style.display = "flex";
        btn9.style.alignItems = "flex-end";
        btn10.style.textAlign = "left";
        f_ques.style.display = "none";
        f_star.style.display = "block";
      } else if (clickCount === 1) {
        pinInputs.pin2.value = value;
        updateMessage('Time for the third digit');
        btn1.style.textAlign = "right";
        t_ques.style.display = "none";
        t_star.style.display = "block";

        btn1.style.textAlign = "right";
        btn2.style.display = "inline-flex";
		btn2.style.alignItems = "flex-end";
        btn3.style.textAlign = "right";
        btn4.style.display = "flex";
        btn4.style.alignItems = "flex-start";
        btn5.style.textAlign = "left";
        btn6.style.textAlign = "right";
        btn7.style.textAlign = "right";
        btn8.style.textAlign = "left";
        btn9.style.display = "flex";
        btn9.style.alignItems = "flex-start";
        btn10.style.textAlign = "left";
      } else if (clickCount === 2) {
        pinInputs.pin3.value = value;
        updateMessage('Finally, the fourth digit');
        th_ques.style.display = "none";
        th_star.style.display = "block";

        btn1.style.textAlign = "left";
        btn2.style.display = "inline-flex";
		btn2.style.alignItems = "flex-start";
        btn4.style.display = "flex";
        btn4.style.alignItems = "flex-end";
        btn5.style.textAlign = "right";
        btn6.style.textAlign = "left";
        btn8.style.textAlign = "left";
        btn9.style.display = "flex";
        btn9.style.alignItems = "flex-end";
        btn10.style.textAlign = "right";
      } else if (clickCount === 3) {
        pinInputs.pin4.value = value;
        fo_ques.style.display = "none";
        fo_star.style.display = "block";

        btn1.style.textAlign = "right";
        btn2.style.display = "inline-flex";
		btn2.style.alignItems = "flex-end";
        btn3.style.textAlign = "right";
        btn4.style.display = "flex";
        btn4.style.alignItems = "flex-start";
        btn5.style.textAlign = "left";
        btn6.style.textAlign = "right";
        btn8.style.textAlign = "left";
        btn9.style.display = "flex";
        btn9.style.alignItems = "flex-start";
        btn10.style.textAlign = "left";

        updateMessage('Submitting...');
        submitForm();
        return; // No need to proceed further
      }

      clickCount++;
      updateButtons();
       playClickSound();
    }

    buttons.forEach(button => {
      button.addEventListener('click', handleClick);
    });
    
    updateButtons();