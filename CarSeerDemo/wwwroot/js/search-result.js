
$(document).ready(function () {


    const params = new URLSearchParams(window.location.search);

    // Get search criteria from Query String
    const makeId = params.get('MakeId');
    const makeName = params.get('MakeName');
    const year = params.get('Year');

    // Check if we have search criteria
    if (!makeId || !makeName || !year) {
        window.location.href = 'Index'
        return;
    }

    // Display search criteria
    $('#displayMake').text(makeName);
    $('#displayYear').text(year);

    // Fetch vehicle types
    const fetchVehicleTypes = async () => {
        try {
            const response = await fetch(`GetVehicleTypesForMakeId?MakeId=${makeId}`);
            const data = await response.json();
            const types = data.results;

            $('#vehicleTypesLoading').hide();

            if (types.length === 0) {
                $('#vehicleTypesContent').html(`
                        <div class="alert alert-info-custom alert-custom">
                            <i class="fas fa-info-circle me-2"></i>
                            No vehicle types found for this make.
                        </div>
                    `);
            } else {
                let html = '<div class="vehicle-types-container">';
                types.forEach(type => {
                    html += `
                            <div class="vehicle-type-badge">
                                <i class="fas fa-car"></i>
                                <span>${type.vehicleTypeName}</span>
                            </div>
                        `;
                });
                html += '</div>';
                $('#vehicleTypesContent').html(html);
            }

        } catch (error) {
            console.error('Error fetching vehicle types:', error);
            $('#vehicleTypesLoading').hide();
            $('#vehicleTypesContent').html(`
    <div class="alert alert-danger-custom alert-custom">
        <i class="fas fa-exclamation-triangle me-2"></i>
        Failed to load vehicle types. Please try again.
    </div>
    `);
        }
    };

    // Fetch models
    const fetchModels = async () => {
        try {
            const response = await fetch(`GetModelsForMakeIdYear?MakeId=${makeId}&Year=${year}`);
            const data = await response.json();
            const models = data.results;

            $('#modelsLoading').hide();

            if (models.length === 0) {
                $('#modelsContent').html(`
                        <div class="empty-state">
                            <i class="fas fa-inbox"></i>
                            <h4>No Models Found</h4>
                            <p>No models available for ${makeName} in ${year}</p>
                        </div>
                    `);
            } else {
                let html = `
    <div class="result-count">
        <i class="fas fa-check-circle"></i>
        <span>Found ${models.length} model${models.length !== 1 ? 's' : ''}</span>
    </div>
    <div class="models-grid">
        `;

                models.forEach(model => {
                    html += `
                            <div class="model-card">
                                <div class="model-icon">
                                    <i class="fas fa-car"></i>
                                </div>
                                <h3 class="model-name">${model.model_Name}</h3>
                            </div>
                        `;
                });

                html += '</div>';
                $('#modelsContent').html(html);

                // Add stagger animation to model cards
                $('.model-card').each(function (index) {
                    $(this).css({
                        'animation': 'fadeIn 0.4s ease-in',
                        'animation-delay': `${index * 0.03}s`,
                        'animation-fill-mode': 'both'
                    });
                });
            }

        } catch (error) {
            console.error('Error fetching models:', error);
            $('#modelsLoading').hide();
            $('#modelsContent').html(`
    <div class="alert alert-danger-custom alert-custom">
        <i class="fas fa-exclamation-triangle me-2"></i>
        Failed to load vehicle models. Please try again.
    </div>
    `);
        }
    };

    // Initialize - fetch both vehicle types and models
    fetchVehicleTypes();
    fetchModels();
});
