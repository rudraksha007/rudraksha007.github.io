load();

function load() {
    fetch('./alumni.json').then((res) => {
        res.json().then((data) => {
            main = document.getElementById('mainContainer')
            for (const year in data) {
                h2 = document.createElement('h2');
                h2.innerText = `Pass Out Year ${year}`;
                main.appendChild(h2);
                a = document.createElement('div');
                a.className = 'dataContainer';
                main.appendChild(a);
                for (const alumni in data[year]) {
                    cont = `<div class="profile">
                            <img src="./pics/${data[year][alumni].pic}" alt="">
                            <h3>${alumni}</h3>
                                <div class="text">
                                    ${data[year][alumni].status}
                                </div>
                            </div>`;
                    a.innerHTML+=cont;
                }
            }
        });
    });
}
// "2017": {
//         "Nandini Banga": {
//             "pic": "Nandini-Banga.jpg",
//             "status": "Doing MBBS from PIMS, Jalandhar"
//         },
//         "Gaurish Dhamija": {
//             "pic": "Gaurish-Dhamija.jpg",
//             "status": "B.Tech. From Thapar Institute of Engineering and Technology, Patiala ; Placed in TCS (Tata Cunsultancy Services)"
//         },
//         "Deepanshu Manocha": {
//             "pic": "Deepanshu-Manocha.jpg",
//             "status": "Placed in Jio as Software Engineer"
//         },
//         "Parmeet Kaur": {
//             "pic": "Parmeet-Kaur.jpg",
//             "status": "B.Sc. (Maths Hons.) from York University, Toronto, Canada"
//         },
//         "Swati Sharma": {
//             "pic": "Swati-Sharma.jpg",
//             "status": "Chemistry Educator In Physics Wallah Private Limited, Co-Operate, Noida, UP"
//         },
//         "Naman Khanna": {
//             "pic": "Naman-Khanna.jpg",
//             "status": "Science Teacher at DAV CENTENARY PUBLIC SCHOOL, PHILLAUR"
//         }
//     },
//     "2018": {
//         "Pragati Chopra": {
//             "pic": "Pragati-Chopra.jpg",
//             "status": "Chartered Accountant"
//         },
//         "Saiyam Kaushal": {
//             "pic": "Saiyam-Kaushal.jpg",
//             "status": "Video Director, Kaushal Films"
//         },
//         "Sakshi Dhir": {
//             "pic": "Sakshi-Dhir.jpg",
//             "status": "Pursuing CA"
//         }
//     },
//     "2019": {
//         "Samarth Anand": {
//             "pic": "Samarth-Anand.jpg",
//             "status": "Professional Video Editor and Enterpreneur, Stich Frames Productions"
//         },
//         "Ankita Vashisht": {
//             "pic": "Ankita-Vashisht.jpg",
//             "status": "Pursuing B.Sc. (Maths Hons.) from Delhi University"
//         },
//         "Yogesh Paul Banga": {
//             "pic": "Yogesh-Paul-Banga.jpg",
//             "status": "Pursuing MBBS from AIIMS, Bathinda"
//         },
//         "Abhiket Mishra": {
//             "pic": "Abhiket-Mishra.jpg",
//             "status": "Pursuing B.Tech. (Mechanical Engineering) from Thapar Institute of Engineering and Technology, Patiala"
//         },
//         "Vaibhav Gupta": {
//             "pic": "Vaibhav-Gupta.jpg",
//             "status": "Pursuing Graduation in Computer Science in Oxford Brookes University, Oxford, UK"
//         },
//         "Eshan Vaid": {
//             "pic": "Eshan-Vaid.jpg",
//             "status": "Pursuing B.Tech. From IIT, Allahabad"
//         },
//         "Nitika Mattu": {
//             "pic": "Nitika-Mattu.jpg",
//             "status": "Completed B. Sc. Nursing in 2024"
//         },
//         "Muskaan Sharma": {
//             "pic": "Muskaan-Sharma.jpg",
//             "status": "Pursuing MBBS (3rd year) Adesh Medical College Bhatinda"
//         }
//     },
//     "2020": {
//         "Harmit Singh Bains": {
//             "pic": "Harmit-Singh-Bains.jpg",
//             "status": "Pursuing B.Tech (Computer Science) from IIT, Tirupati"
//         },
//         "Isha Chaudhari": {
//             "pic": "Isha-Chaudhari.jpg",
//             "status": "Pursuing CA Foundation along with B.Com. (Hons.)"
//         },
//         "Yuvraj Verma": {
//             "pic": "Yuvraj-Verma.jpg",
//             "status": "Pursuing BA LLB from Guru Nanak Dev Regional Campus, Jalandhar, currently in 8th semester"
//         }
//     },
//     "2021": {
//         "Palak Duggal": {
//             "pic": "Palak-Duggal.jpg",
//             "status": "Cracked JEE (MAIN) 2021 with 96.82 percentile"
//         },
//         "Anshika Jain": {
//             "pic": "Anshika-Jain.jpg",
//             "status": "Cracked JEE (MAIN) 2021 with 91.42 percentile"
//         },
//         "Harishika": {
//             "pic": "Harishika.jpg",
//             "status": "MBBS (2nd year) at Government Medical College, Amritsar"
//         }
//     },
//     "2022": {
//         "Aditya": {
//             "pic": "Aditya.jpg",
//             "status": "Pursuing B.Tech at IIT Kharagpur"
//         },
//         "Anupama": {
//             "pic": "Anupama.jpg",
//             "status": "Pursuing MBBS (2nd year) from GIAN SAGAR MEDICAL COLLEGE, RAJPURA, PUNJAB. Secured 5th rank in BABA FARID UNIVERSITY, PUNJAB in 1st professional year MBBS"
//         }
//     }