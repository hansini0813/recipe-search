import React from 'react';
import './Modal.css'; // Create this CSS file for styling the modal

const Modal = ({ isOpen, onClose, nutrition }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="nutrient-box">
          <h2>Nutrition Facts</h2>
          <h4>Amount Per Serving</h4>
          <p>Calories: {nutrition.calories}</p>
          <p>Total Fat: {nutrition.totalNutrients?.FAT?.quantity} g ({nutrition.totalNutrients?.FAT?.percentOfDailyNeeds} %)</p>
          <p>Saturated Fat: {nutrition.totalNutrients?.FASAT?.quantity} g ({nutrition.totalNutrients?.FASAT?.percentOfDailyNeeds} %)</p>
          <p>Trans Fat: {nutrition.totalNutrients?.FATRN?.quantity} g</p>
          <p>Cholesterol: {nutrition.totalNutrients?.CHOLE?.quantity} mg ({nutrition.totalNutrients?.CHOLE?.percentOfDailyNeeds} %)</p>
          <p>Sodium: {nutrition.totalNutrients?.NA?.quantity} mg ({nutrition.totalNutrients?.NA?.percentOfDailyNeeds} %)</p>
          <p>Total Carbohydrate: {nutrition.totalNutrients?.CHOCDF?.quantity} g ({nutrition.totalNutrients?.CHOCDF?.percentOfDailyNeeds} %)</p>
          <p>Dietary Fiber: {nutrition.totalNutrients?.FIBTG?.quantity} g ({nutrition.totalNutrients?.FIBTG?.percentOfDailyNeeds} %)</p>
          <p>Total Sugars: {nutrition.totalNutrients?.SUGAR?.quantity} g</p>
          <p>Includes - Added Sugars: {nutrition.totalNutrients?.SUGAR?.addedSugars || 0} g</p>
          <p>Protein: {nutrition.totalNutrients?.PROCNT?.quantity} g ({nutrition.totalNutrients?.PROCNT?.percentOfDailyNeeds} %)</p>
          <p>Vitamin D: {nutrition.totalNutrients?.VITD?.quantity} µg ({nutrition.totalNutrients?.VITD?.percentOfDailyNeeds} %)</p>
          <p>Calcium: {nutrition.totalNutrients?.CA?.quantity} mg ({nutrition.totalNutrients?.CA?.percentOfDailyNeeds} %)</p>
          <p>Iron: {nutrition.totalNutrients?.FE?.quantity} mg ({nutrition.totalNutrients?.FE?.percentOfDailyNeeds} %)</p>
          <p>Potassium: {nutrition.totalNutrients?.K?.quantity} mg ({nutrition.totalNutrients?.K?.percentOfDailyNeeds} %)</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
