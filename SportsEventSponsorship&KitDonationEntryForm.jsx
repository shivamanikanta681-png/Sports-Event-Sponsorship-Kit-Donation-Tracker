import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function SportsEventSponsorshipAndKitDonationEntryForm({ sponsorshipId, onSave, onCancel }) {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [targetAudience, setTargetAudience] = useState('School');
  const [budgetLimit, setBudgetLimit] = useState(0);
  const [itemsDonated, setItemsDonated] = useState([
    { name: '', qty: 1, unitCost: 0 }
  ]);
  const [visibilityChecklist, setVisibilityChecklist] = useState({
    banner: false,
    jerseyLogo: false,
    socialMedia: false,
    prizeSpeech: false
  });
  const [visibilityNotes, setVisibilityNotes] = useState('');
  const [status, setStatus] = useState('Approved');
  const [notes, setNotes] = useState('');
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const isEditMode = !!sponsorshipId;

  // Load existing data if in Edit Mode
  useEffect(() => {
    if (isEditMode) {
      fetchExistingRecord();
    }
  }, [sponsorshipId]);

  const fetchExistingRecord = async () => {
    try {
      const response = await fetch(`${API_URL}/api/sports_event_sponsorship_kit_donati/${sponsorshipId}`);
      const resData = await response.json();
      if (resData.success) {
        const data = resData.data;
        setEventName(data.event_name);
        
        if (data.event_date.includes(' to ')) {
          const parts = data.event_date.split(' to ');
          setStartDate(parts[0]);
          setEndDate(parts[1]);
        } else {
          setStartDate(data.event_date);
          setEndDate(data.event_date);
        }

        setTargetAudience(data.category);
        setBudgetLimit(data.budget_limit);
        setItemsDonated(data.items_donated);
        setVisibilityChecklist(data.brand_visibility_received);
        setStatus(data.status);
        setNotes(data.notes || '');
      }
    } catch (error) {
      console.error("Error fetching record to edit:", error);
      setValidationError("Failed to load existing record data.");
    }
  };

  const handleAddItemRow = () => {
    setItemsDonated([...itemsDonated, { name: '', qty: 1, unitCost: 0 }]);
  };

  const handleRemoveItemRow = (index) => {
    const updated = itemsDonated.filter((_, i) => i !== index);
    setItemsDonated(updated);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...itemsDonated];
    if (field === 'qty') {
      updated[index].qty = Math.max(1, parseInt(value) || 0);
    } else if (field === 'unitCost') {
      updated[index].unitCost = Math.max(0, parseFloat(value) || 0);
    } else {
      updated[index][field] = value;
    }
    setItemsDonated(updated);
  };

  const calculateTotalCost = () => {
    return itemsDonated.reduce((sum, item) => sum + (item.qty * item.unitCost), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    setSuccessMessage('');

    const totalCost = calculateTotalCost();

    if (totalCost > budgetLimit) {
      setValidationError(`Validation Error: Total item cost (₹${totalCost.toLocaleString()}) exceeds the approved budget limit of ₹${budgetLimit.toLocaleString()} by ₹${(totalCost - budgetLimit).toLocaleString()}.`);
      return;
    }

    const visibilitySelected = Object.values(visibilityChecklist).some(val => val === true);
    if (!visibilitySelected) {
      setValidationError('Validation Error: You must select at least one brand visibility option.');
      return;
    }

    const payload = {
      event_name: eventName,
      event_date: startDate === endDate ? startDate : `${startDate} to ${endDate}`,
      category: targetAudience,
      budget_limit: budgetLimit,
      items_donated: itemsDonated,
      brand_visibility_received: visibilityChecklist,
      status,
      notes
    };

    setSubmitting(true);
    try {
      const url = isEditMode 
        ? `${API_URL}/api/sports_event_sponsorship_kit_donati/${sponsorshipId}`
        : `${API_URL}/api/sports_event_sponsorship_kit_donati`;

      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(isEditMode ? 'Sponsorship updated successfully!' : 'Sponsorship logged successfully!');
        if (onSave) onSave();
      } else {
        setValidationError(data.message || 'Error occurred saving sponsorship.');
      }
    } catch (err) {
      console.error(err);
      setValidationError('Server communication failure.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="entry-form-container">
      <h2 className="heading">
        {isEditMode ? 'Edit Sports Event Sponsorship & Kit Donation Log' : 'Sports Event Sponsorship & Kit Donation Entry Form'}
      </h2>
      
      {validationError && (
        <div className="error-alert-box">
          <strong>⚠️ {validationError}</strong>
        </div>
      )}
      
      {successMessage && (
        <div className="success-alert-box">
          <strong>✅ {successMessage}</strong>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-layout">
        
        {/* Section 1: Event Details */}
        <fieldset className="fieldset">
          <legend className="legend">1. Event Details</legend>
          <div className="form-row">
            <div className="form-col">
              <label className="label-text">Event/School Name *</label>
              <input 
                type="text" 
                required 
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="form-input"
                placeholder="e.g. Peerzadiguda Govt High School Championship"
              />
            </div>
            <div className="form-col">
              <label className="label-text">Target Audience Category</label>
              <select 
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="form-select"
              >
                <option value="School">School</option>
                <option value="Tournament">Tournament</option>
                <option value="Academy">Academy</option>
                <option value="Club">Club</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label className="label-text">Start/Event Date</label>
              <input 
                type="date" 
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-col">
              <label className="label-text">End Date</label>
              <input 
                type="date" 
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </fieldset>

        {/* Section 2: Items Donated */}
        <fieldset className="fieldset">
          <legend className="legend">2. Items Donated (Kit Details)</legend>
          {itemsDonated.map((item, index) => (
            <div key={index} className="item-list-row">
              <input 
                type="text" 
                placeholder="Item Name" 
                required
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                className="form-input"
                style={{ flex: 2, marginRight: '10px' }}
              />
              <input 
                type="number" 
                placeholder="Qty" 
                required
                min="1"
                value={item.qty}
                onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                className="form-input"
                style={{ flex: 0.5, marginRight: '10px' }}
              />
              <input 
                type="number" 
                placeholder="Unit Cost (₹)" 
                required
                min="0"
                value={item.unitCost}
                onChange={(e) => handleItemChange(index, 'unitCost', e.target.value)}
                className="form-input"
                style={{ flex: 1, marginRight: '10px' }}
              />
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#ff8c00' }}>
                  ₹{(item.qty * item.unitCost).toLocaleString()}
                </span>
                {itemsDonated.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => handleRemoveItemRow(index)}
                    className="btn-remove-item"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}

          <button type="button" onClick={handleAddItemRow} className="btn-add-item">
            + Add Another Item
          </button>
          
          <div className="cost-summary-box">
            <span>Total Calculated Value: </span>
            <span style={{ color: '#ff6b00', fontSize: '1.25rem', fontWeight: 'bold' }}>
              ₹{calculateTotalCost().toLocaleString()}
            </span>
          </div>
        </fieldset>

        {/* Section 3: Brand Visibility */}
        <fieldset className="fieldset">
          <legend className="legend">3. Brand Visibility Secured</legend>
          <div className="checkbox-layout-grid">
            <label className="checkbox-container-label">
              <input 
                type="checkbox" 
                checked={visibilityChecklist.banner}
                onChange={(e) => setVisibilityChecklist({...visibilityChecklist, banner: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              Boundary Banner Placement
            </label>
            <label className="checkbox-container-label">
              <input 
                type="checkbox" 
                checked={visibilityChecklist.jerseyLogo}
                onChange={(e) => setVisibilityChecklist({...visibilityChecklist, jerseyLogo: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              Jersey Logo / Branding
            </label>
            <label className="checkbox-container-label">
              <input 
                type="checkbox" 
                checked={visibilityChecklist.socialMedia}
                onChange={(e) => setVisibilityChecklist({...visibilityChecklist, socialMedia: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              Social Media Mentions
            </label>
            <label className="checkbox-container-label">
              <input 
                type="checkbox" 
                checked={visibilityChecklist.prizeSpeech}
                onChange={(e) => setVisibilityChecklist({...visibilityChecklist, prizeSpeech: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              Prize Distribution Speech
            </label>
          </div>
        </fieldset>

        {/* Section 4: Budget & Status */}
        <fieldset className="fieldset">
          <legend className="legend">4. Budget & Workflow Details</legend>
          <div className="form-row">
            <div className="form-col">
              <label className="label-text">Approved Budget Limit (₹) *</label>
              <input 
                type="number" 
                required
                min="0"
                value={budgetLimit}
                onChange={(e) => setBudgetLimit(parseFloat(e.target.value) || 0)}
                className="form-input"
              />
            </div>
            <div className="form-col">
              <label className="label-text">Sponsorship Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-select"
              >
                <option value="Draft">Draft</option>
                <option value="Approved">Approved</option>
                <option value="Disbursed">Disbursed</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label className="label-text">General Notes / Remarks</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any administrative notes..."
              rows="2"
              className="form-textarea"
            />
          </div>
        </fieldset>

        <div className="action-btn-row">
          <button type="submit" className="btn-submit-action" disabled={submitting}>
            {submitting ? 'Processing...' : (isEditMode ? 'Update Log Entry' : 'Save Sponsorship Entry')}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-cancel-action" disabled={submitting}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
