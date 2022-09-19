import React from 'react';

function PlaceCard({}) {
  return (
    <div>
      <div class="row g-0" style={{ border: "1px solid black" }}>
        <div class="col-md-4">
          <img src="..." class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;