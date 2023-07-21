// Wrap your JavaScript code in a function to control when it runs
function setupBillTracker () {
  // Cache frequently used DOM elements
  const billForm = document.getElementById('bill-form')
  const billTable = document.getElementById('bill-list')
  const billNameInput = document.getElementById('bill-name')
  const billAmountInput = document.getElementById('bill-amount')
  const billDateInput = document.getElementById('bill-date') // Add billDateInput
  const billTotalDiv = document.getElementById('bill-total')
  const filterInput = document.getElementById('filter-input')
  const searchInput = document.getElementById('search-input')

  // Helper function to format the date as "month, day, year"
  function formatDate (dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Event listener for form submission
  billForm.addEventListener('submit', function (event) {
    event.preventDefault()

    // Get input values
    const billName = billNameInput.value
    const billAmount = billAmountInput.value
    const billDate = formatDate(billDateInput.value) // Correct variable name and format date

    // Create new row in the table using template literals
    const newRow = document.createElement('tr')
    newRow.classList.add('bill-item')
    newRow.innerHTML = `
      <td>${billName}</td>
      <td>$${billAmount}</td>
      <td>${billDate}</td>
      <td>
        <button class="delete-btn">Delete</button>
      </td>
    `

    // Append new row to the table
    billTable.appendChild(newRow)

    // Clear input fields
    billNameInput.value = ''
    billAmountInput.value = ''
    billDateInput.value = ''

    // Update total after adding a bill
    updateTotal()
  })

  // Event listener for delete button clicks using event delegation
  billTable.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
      const row = event.target.parentElement.parentElement
      row.remove()

      // Update total after removing a bill
      updateTotal()
    }
  })

  // Function to update total bill amount
  function updateTotal () {
    const billAmounts = Array.from(
      document.querySelectorAll('.bill-item td:nth-child(2)')
    ).map(item => parseFloat(item.innerText.replace('$', '')))

    const totalAmount = billAmounts.reduce((acc, curr) => acc + curr, 0)
    billTotalDiv.innerText = `Total: $${totalAmount.toFixed(2)}`
  }

  // Event listener for filter input changes
  filterInput.addEventListener('input', function () {
    const filterValue = filterInput.value.toLowerCase()

    // Loop through each bill row and check if it matches the filter value
    const billRows = document.querySelectorAll('.bill-item')
    billRows.forEach(row => {
      const billName = row
        .querySelector('td:nth-child(1)')
        .innerText.toLowerCase()
      const billAmount = row
        .querySelector('td:nth-child(2)')
        .innerText.toLowerCase()
      const billDate = row
        .querySelector('td:nth-child(3)')
        .innerText.toLowerCase()

      if (
        billName.includes(filterValue) ||
        billAmount.includes(filterValue) ||
        billDate.includes(filterValue)
      ) {
        row.style.display = 'table-row'
      } else {
        row.style.display = 'none'
      }
    })
  })

  // Event listener for search input changes
  searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase()

    // Loop through each bill row and check if it matches the search value
    const billRows = document.querySelectorAll('.bill-item')
    billRows.forEach(row => {
      const billName = row
        .querySelector('td:nth-child(1)')
        .innerText.toLowerCase()

      if (billName.includes(searchValue)) {
        row.style.display = 'table-row'
      } else {
        row.style.display = 'none'
      }
    })
  })

  // Call the function to set up the bill tracker once the document has loaded
  updateTotal()
}

// Call the function to set up the bill tracker once the document has loaded
document.addEventListener('DOMContentLoaded', setupBillTracker)
