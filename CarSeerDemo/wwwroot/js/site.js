
$(document).ready(function () {

    let allMakes = [];
    let selectedMakeId = null;
    let selectedMakeName = '';
    let selectedYear = null;

    // Set current year
    const currentYear = new Date().getFullYear();
    $('#currentYear').text(currentYear);

    // Initialize Year Picker
    $('#yearInput').datepicker({
        format: 'yyyy',
        viewMode: 'years',
        minViewMode: 'years',
        startView: 'years',
        autoclose: true,
        startDate: '1995',
        endDate: currentYear.toString(),
        orientation: 'bottom auto',
        todayHighlight: true,
        container: 'body'
    }).on('changeDate', function (e) {
        if (e.date) {
            selectedYear = e.date.getFullYear();
            $(this).val(selectedYear);
            validateForm();
        }
    });


    $('#yearInput').on('input blur', function () {
        const year = parseInt($(this).val());
        if (year >= 1995 && year <= currentYear) {
            selectedYear = year;
            validateForm();
        } else {
            selectedYear = null;
            validateForm();
        }
    });


    let makesLoaded = false;

    $('#makeSelect').select2({
        theme: 'bootstrap-5',
        placeholder: 'Type to search for a make...',
        allowClear: true,
        width: '100%',
        dropdownParent: $('body'),

    }).on('select2:opening', async function (e) {


        if (makesLoaded) return;

        e.preventDefault();

        const $select = $('#makeSelect');

        $select.html('<option>Loading...</option>');
        $select.trigger('change');

        try {

            const response = await fetch(`/Home/GetAllMakes`);
            const data = await response.json();


            allMakes = data.results.sort((a, b) =>
                a.make_Name.localeCompare(b.make_Name)
            );


            $select.empty();
            $select.append('<option value="">Select a vehicle make...</option>');

            allMakes.forEach(make => {
                $select.append(
                    `<option value="${make.make_ID}" data-name="${make.make_Name}">${make.make_Name}</option>`
                );
            });

            makesLoaded = true;

            $select.trigger('change');
            $('#makeSelect').select2('open');


        } catch (error) {
            console.error('Error fetching makes:', error);
            alert('Failed to load vehicle makes. Please refresh the page.');
        }

    });


    // Make selection change
    $('#makeSelect').on('change', function () {
        const makeId = $(this).val();
        const makeName = $(this).find('option:selected').data('name');

        if (makeId) {
            selectedMakeId = parseInt(makeId);
            selectedMakeName = makeName;
        } else {
            selectedMakeId = null;
            selectedMakeName = '';
        }

        validateForm();
    });

    // Validate form
    const validateForm = () => {
        if (selectedMakeId && selectedYear) {
            $('#searchBtn').prop('disabled', false);
        } else {
            $('#searchBtn').prop('disabled', true);
        }
    };

    // Form submission
    $('#searchForm').on('submit', function (e) {

        e.preventDefault();

        if (selectedMakeId && selectedYear) {

            // Show loading overlay
            $('#loadingOverlay').css('display', 'flex');

            var formData = new FormData();
            formData.append('MakeId', selectedMakeId);
            formData.append('Year', selectedYear);
            formData.append('MakeName', selectedMakeName);

            // Navigate to results page
            setTimeout(() => {
                SubmitSearchForm(formData);
            }, 500);
        }

    });

    function SubmitSearchForm(formData) {

        $.ajax({
            url: '/Home/Search',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            headers:
            {
                'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
            },
            success: function (response) {

                $('#loadingOverlay').css('display', 'none');

                if (response.redirectUrl) {

                    window.location.href = response.redirectUrl;
                }

            }, error: function (xhr, status, error) {

                $('#loadingOverlay').css('display', 'none');
                console.error('Error during search request:', xhr.responseText);
                alert(xhr.responseText);
            }
        })

    }

});