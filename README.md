                                    GUIDEWIRE DEVTRAILS HACKATHON PHASE-1 :"Ideate & Know Your Delivery Worker"
**GROUP NAME :** Mission ImPASSible

**PROJECT-TITLE :** PrimeProtect AI

**SUMMARY**: "AI-Powered Parametric Insurance for India’s Gig Economy"

**ABSTRACT:**

PrimeProtect AI is an intelligent parametric insurance platform designed to protect delivery partners from income loss caused by external disruptions such as extreme weather, pollution, and urban conditions. Unlike traditional insurance systems, PrimeProtect AI leverages real-time data and AI-driven insights to automatically trigger claims and ensure instant compensation without manual intervention.

---

**PROBLEM STATEMENT :**

India’s gig economy delivery partners, such as those working with Zomato and Swiggy, play a crucial role in supporting everyday on-demand services. Despite their importance, they face significant challenges due to external factors beyond their control.

Conditions like heavy rainfall, extreme heat, high pollution levels, and severe traffic congestion often make it difficult or unsafe for them to work. As a result, they are forced to reduce their working hours or stop working altogether.

This directly impacts their earnings, leading to an estimated 20–30% loss in income, without any form of financial protection or safety net to support them during such disruptions.

---

**PROPOSED SOLUTION:**

PrimeProtect AI is an intelligent, AI-powered parametric insurance platform designed to provide reliable income protection for delivery partners facing external disruptions. Unlike traditional insurance systems that require manual claim filing and verification, PrimeProtect AI offers a fully automated, data-driven approach to ensure quick and transparent compensation.

---

**KEY IDEA :**

<img width="321" height="501" alt="image" src="https://github.com/user-attachments/assets/ba9f0086-d3e2-40ba-a188-5593e3e9f646" />


Upon detection of a predefined disruption, the system autonomously initiates the claim process and executes instant compensation for the affected user.

---

**TARGET PERSONA:**

1)Primary Users:

Food Delivery Partners associated with platforms such as Zomato and Swiggy

Individuals engaged in last-mile delivery services within urban and semi-urban areas

2)User Characteristics:

i)Outdoor-Dependent Work:
Delivery partners primarily operate in outdoor environments, making them highly exposed to weather and environmental conditions.

ii)Earnings-Based on Activity:
Income is directly linked to the number of deliveries completed, typically calculated on a per-order or weekly basis.

iii)Lack of Income Stability:
Absence of fixed salaries or guaranteed minimum wages leads to significant income fluctuations.

iv)High Sensitivity to External Disruptions:
Environmental factors such as heavy rainfall, extreme heat, poor air quality, and traffic congestion directly impact their ability to work and earn.

v)Limited Access to Financial Protection:
Most delivery partners do not have access to structured insurance products that cover loss of income due to external, uncontrollable events.

vi)Needs & Challenges:
* Reliable income protection during unexpected disruptions
* Simple and affordable insurance aligned with weekly earnings
* Fast and hassle-free claim processing
* Transparent and trustworthy system without complex procedures

 ---


**SYSTEM WORKFLOW:**

1. User Onboarding:

* The delivery partner signs up on the platform using basic details
* The user selects their working city and delivery zone
* This helps the system understand their working environment


2. Risk Profiling:

* The system uses AI to analyze the selected location
* It checks past data like:

   i) Weather patterns
  ii) Pollution levels
 iii) Traffic conditions

* Based on this, a RISK SCORE is assigned to the user
* Risk Score- It acts as Threshold value for us.

3. Policy Creation:

* Based on the risk score, the system calculates a WEEKLY PREMIUM
* The user is shown available coverage options
* The user selects a plan and activates the policy
  

4. Real-Time Monitoring:

* Once the policy is active, the system continuously tracks:

  i) Weather conditions
 ii) Air Quality Index (AQI)
iii) Traffic congestion

* This monitoring happens automatically using APIs or simulated data


5. Parametric Trigger Activation:

* If any condition crosses a predefined limit (e.g., heavy rain or high AQI):

    i)The system detects it instantly
   ii)A trigger is activated automatically
  
* No manual reporting is required from the user

6. Claim Processing:

* The claim is automatically created by the system
* Fraud detection checks are performed:

   i)Location validation (GPS)
  ii)Activity verification
 Iii)Duplicate claim checks

* If valid, the claim is approved instantly

7. Instant Payout

* The approved amount is processed immediately
* Payment is sent via a mock/sandbox payment system
* The user receives a notification confirming the payout

Work Flow- flow chart:

<img width="404" height="601" alt="image" src="https://github.com/user-attachments/assets/40d3f183-ad6f-45f7-85a5-9a00d8702701" />

---


**WEEKLY PRICING MODEL:**
(Tentative)

| Risk Level | Weekly Premium | Coverage |
|-----------|--------------|---------|
| Low Risk  | ₹20          | ₹300 payout |
| Medium    | ₹35          | ₹500 payout |
| High Risk | ₹50          | ₹800 payout |

---

**PRICING LOGIC:**

* Risk-Based Premium Calculation:
  The weekly premium is determined based on the level of environmental risk in the user’s working location (e.g., areas prone to heavy rain or high pollution have higher premiums).

* Higher Risk → Higher Coverage → Higher Premium:
  Users operating in high-risk zones pay a slightly higher premium but receive greater coverage and payout benefits.

* Low Risk → Lower Premium:
  Delivery partners in safer zones benefit from lower premiums due to reduced chances of disruption.

* Weekly Subscription Model:
  Premiums are structured on a **weekly basis**, aligning with the earning cycle of gig workers and ensuring affordability.

* Dynamic Adjustment Using AI:
  Premiums can be adjusted over time based on changing environmental conditions and historical data trends.

  ---


**PARAMETRIC TRIGGERS :**

The system automatically triggers payouts when:

- Rainfall exceeds threshold (e.g., >50mm)  
- AQI exceeds 300 (Severe Pollution)  
- Temperature exceeds 45°C  
- Traffic congestion exceeds defined limits

---


**INTEGRATION ARCHITECTURE:**

| Component        | Integration |
|-----------------|------------|
| Weather Data     | OpenWeather API |
| Pollution Data   | Mock / API |
| Traffic Data     | Mock |
| Payment Gateway  | Razorpay / Stripe (Sandbox) |

---




**DASHBOARD FEATURES:**

1)Worker Dashboard:
- Active weekly coverage  
- Earnings protected  
- Risk alerts  
- Claim history  

2)Admin Dashboard
- Claims analytics  
- Fraud alerts  
- Risk heatmaps  
- Predictive insights

---



**TECH SOFTWARES:**

- **Frontend:** React.js  
- **Backend:** Node.js / Express  
- **AI/ML:** Python (Scikit-learn)  
- **Database:** MongoDB / Firebase  
- **APIs:** OpenWeather API  
- **Payments:** Razorpay (Test Mode)

---

**AI & MACHINE LEARNING MODELS:**


| Component                     | Technique / Algorithm Used            | Purpose |
|------------------------------|--------------------------------------|--------|
| Risk Assessment              | Regression Model (Linear/Random Forest) | Predict environmental risk and calculate weekly premium |
| Disruption Prediction        | Time Series Analysis                  | Forecast weather or pollution-based disruptions |
| Dynamic Pricing              | Machine Learning Model                | Adjust premiums based on real-time risk factors |
| Fraud Detection              | Anomaly Detection (Isolation Forest)  | Identify unusual or suspicious claim behavior |
| Location Validation          | GPS Data Validation + Rule-based Logic| Ensure user is active in the claimed area |
| Claim Automation             | Rule-based + Event Trigger System     | Automatically initiate claims when thresholds are met |


---


**PLATFORM CHOICE:**

We propose a **Hybrid Platform (Mobile + Web Application)** to ensure maximum accessibility and flexibility for all users.

* Mobile Access for Delivery Partners:
  Delivery partners can easily access the platform on smartphones, which are their primary working devices.

* Web Dashboard for Admin & Analytics:
  A web-based interface allows administrators to monitor claims, analyze data, and manage the system efficiently.

* No Installation Barrier:
  The web component ensures quick access without requiring mandatory app installation.

* Cross-Platform Accessibility:
  The system can be accessed anytime, anywhere across devices, ensuring a seamless user experience.

  ---


**SYSTEM ARCHITECTURE:**

<img width="864" height="599" alt="image" src="https://github.com/user-attachments/assets/2a01808f-266c-40a1-a04c-2b4fe0ec5f59" />

