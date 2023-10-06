import React from "react";

export default function ClassroomCard({ id, name, description, image }: { id: string, name: string, description: string, image: string }) {
    return (
        <div className="card">
            <img src={image} alt="image" />

            <div className="card-content">
                <p>{name}</p>
                <p>{description}</p>
            </div>
        </div>
    );
}