import React from "react";

export default function ClassroomCard({ id, name, image }) {
    return (
        <div id="w-node-f5a7fbcb-b4ee-ef50-0599-a5a830361ecc-e9803f0d" className="inner-container _348px _100-tablet">
            <div className="position-relative---z-index-1">
                <img src="https://assets.website-files.com/645128e3dbdad55ed2803eff/6452c4897b45e01bf8fc651e_image-card-inside-dashflow-webflow-template.jpg" loading="eager" alt="" sizes="(max-width: 479px) 83vw, (max-width: 767px) 86vw, (max-width: 991px) 42vw, (max-width: 1439px) 33vw, 348px" srcset="https://assets.website-files.com/645128e3dbdad55ed2803eff/6452c4897b45e01bf8fc651e_image-card-inside-dashflow-webflow-template-p-500.jpg 500w, https://assets.website-files.com/645128e3dbdad55ed2803eff/6452c4897b45e01bf8fc651e_image-card-inside-dashflow-webflow-template.jpg 696w" class="border-radius-12px" />
                <div className="card inside-image">
                    <h3 className="text-200 bold">{name}</h3>
                    <p className="mg-bottom-0">id is "{id}".</p>
                </div>
            </div>
        </div>
    );
}